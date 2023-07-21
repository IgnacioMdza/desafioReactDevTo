import { useEffect } from "react"


export const postsFetch = (set: any) => {
    useEffect(() => {
        fetch('https://api-25-ebs.ignaciomdza.dev/posts')
            .then(response => response.json())
            .then(response => {
                set(response.data);
            })
    }, [])
}