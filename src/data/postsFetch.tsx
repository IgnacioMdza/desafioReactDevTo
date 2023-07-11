import { useEffect } from "react"

export const postsFetch = (set) => {
    useEffect(() => {
        fetch('http://localhost:8080/posts')
            .then(response => response.json())
            .then(response => {
                set(response.data);
            })
    }, [])
}