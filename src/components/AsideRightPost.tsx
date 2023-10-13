
import AuthorCard from "./AuthorCard"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import MoreFrom from "./MoreFrom"

interface intPostList {
    postAuthorId: string,
    postAuthor: string,
    _id: string,
    postTitle: string,
    postTags: []
}

export default function AsideRightPost () {
    const { postid } = useParams()
    const [postsList, setPostsList] = useState<intPostList[]>([])
    useEffect(() => {
        // fetch('https://api-25-ebs.ignaciomdza.dev/posts')
        fetch('http://localhost:8080/posts')
            .then(response => response.json())
            .then(response => {
                setPostsList(response.data);
            })
    }, [])

    return (
        <>
            {
                postsList.filter((item) => item._id === postid).map((post, index) => {
                    return (
                        <div key={`asideRightDiv-${index}`} className='flex flex-col gap-4'>
                            <AuthorCard authorId={post.postAuthorId}/>
                            <MoreFrom authorId={post.postAuthorId} author={post.postAuthor} posts={postsList}/>
                        </div>
                )})
            }

        </>
    )
}