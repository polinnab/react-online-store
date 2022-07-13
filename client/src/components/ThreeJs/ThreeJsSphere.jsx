import React from "react";
import * as THREE from "three";
import * as dat from "dat.gui";

import './three.scss';
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

function ThreeJsSphere() {

    const refContainer = useRef();

    const [renderer, setRenderer] = useState()

    useEffect(() => {
        const { current: container } = refContainer;
        if (container && !renderer ) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            })
            renderer.setSize(width, height)
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild(renderer.domElement);
            setRenderer(renderer);
            console.log('renderer useEffect: ', renderer);
            renderer.render(scene, camera);
        } 
        if (container && renderer) {
            tick()
        }
    })


        // Loader
        const textureLoader = new THREE.TextureLoader()
        const normalTexture = textureLoader.load('/textures/NormalMap.png');
        // Debug
        const gui = new dat.GUI()
        // Scene
        const scene = new THREE.Scene()
        // Objects
        const geometry = new THREE.SphereGeometry(.5, 65, 65)
        // Materials
        const material = new THREE.MeshStandardMaterial()
        material.metalness = 0.7
        material.roughness = 0.2
        material.normalMap = normalTexture; 
        material.color = new THREE.Color(0x000000)
        // Mesh
        const sphere = new THREE.Mesh(geometry,material)
        scene.add(sphere)
        // Lights
        const pointLight = new THREE.PointLight(0xffffff, 0.1)
        pointLight.position.x = 0.17
        pointLight.position.y = 0.09
        pointLight.position.z = -0.2
        scene.add(pointLight)
        //Light2
        const pointLight2 = new THREE.PointLight(0xff0000, 2)
        pointLight2.position.set(-0.56,0.3,-0.61)
        pointLight2.intensity = 9
        scene.add(pointLight2)

        //Light3
        const pointLight3 = new THREE.PointLight(0x75de, 2)
        pointLight3.position.set(0.09,-0.93,-1.76)
        pointLight3.intensity = 5
        scene.add(pointLight3)

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 2
        scene.add(camera)


    /**
     * Animate
     */

    document.addEventListener('mousemove', onDocumentMouseMove)

    let mouseX = 0
    let mouseY = 0

    let targetX = 0
    let targetY = 0

    const windowX = window.innerWidth / 2
    const windowY = window.innerHeight / 2


    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowX
        mouseY = event.clientY - windowY
    }


    // zoom by scroll

    window.addEventListener('mousewheel', onMouseWheelZoom)

    function onMouseWheelZoom(event) {
        camera.position.z += event.deltaY/500;
    }

    const clock = new THREE.Clock()

    const tick = () => {

        targetX = mouseX * .001
        targetY = mouseY * .001
    
        const elapsedTime = clock.getElapsedTime()
    
        // Update objects
        sphere.rotation.y = .5 * elapsedTime
    
        sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
        sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
        sphere.rotation.z += .5 * (targetY - sphere.rotation.x)

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }


    return(
        <div ref={refContainer} className="canvas-container"></div>
    )
}

export default ThreeJsSphere