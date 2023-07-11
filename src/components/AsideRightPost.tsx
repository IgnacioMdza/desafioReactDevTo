import AuthorCard from "./AuthorCard"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { postsFetch } from "../data/postsFetch"
import MoreFrom from "./MoreFrom"

export default function AsideRightPost () {
    const { postid } = useParams()
    const [postsList, setPostsList] = useState<any>([])
    postsFetch(setPostsList)

    return (
        <>
            {
                postsList.filter((item) => item._id === postid).map((post, index) => {
                    return (
                        <>
                            <AuthorCard authorId={post.postAuthorId}/>
                            <MoreFrom authorId={post.postAuthorId} author={post.postAuthor} posts={postsList}/>
                        </>
                )})
            }

        </>
    )
}