import { useState } from "react";
import { useParams } from 'react-router-dom';
import { postsFetch } from "../data/postsFetch";

import PostCardContent from "../components/PostCardContent";

export default function Content () {
    const { postid } = useParams()
    const [postsList, setPostsList] = useState<any>([])
    postsFetch(setPostsList)

    return (
        <>
            { 
            postsList.filter((item) => item._id === postid).map((post, index) => {
                return (
                    <PostCardContent title={post.postTitle} image={post.postImageURL} date={`${post.postDateDay} ${post.postDateMonth}`} authorName={post.postAuthor} readTime={post.postReadTime} tags={post.postTags} likes={post.postLikes.likeCounter} authorId={post.postAuthorId} id={post._id} content={post.postContent}/>
                )
            })
            
            }
        </>
    )
}