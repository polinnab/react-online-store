import {useRef, useCallback} from "react"

export function useThrottle(callback, delay) {
    const isThrottled = useRef(null)

    const throttledCallback = useCallback((...args) => {
        if (isThrottled.current) {
        return
        }

        callback(args)
        isThrottled.current = true;
        setTimeout(() => isThrottled.current = false, delay)
    }, [callback, delay])

    return throttledCallback
}

export function useDebounce(callback, delay) {
    const timer = useRef(null);
  
    const debouncedCallback = useCallback((...args) => {
        if(timer.current) {
            clearTimeout(timer.current)
        }
  
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay]);
  
    return debouncedCallback
}