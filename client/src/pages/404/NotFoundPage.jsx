import React from "react";
import Button from "../../components/Button/Button";
import { main_route } from "../../shared/utils/_constans";
import image404 from "../../assets/images/404-page.jpeg";
import "./NotFoundPage.scss";

export default function NotFoundPage() {

    return(
        <div className="NotFoundPage-container">
            <img className="NotFoundPage-image" src={image404} alt="not-found" />
            <h3 className="NotFoundPage-title">Sorry, Page Not Found...</h3>

            <Button color={'orange'} type='navlink' to={main_route}>Go Home</Button>
        </div>
    )
}