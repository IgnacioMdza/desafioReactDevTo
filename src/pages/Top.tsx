import { useState } from "react"

import PostCardHome from "../components/PostCardHome";
import { postsFetch } from "../data/postsFetch";

export default function Top () {
    const [postsList, setPostsList] = useState<any>([])
    postsFetch(setPostsList)

    return(
        <>
        {
            postsList.sort(function(a, b) {return a.postReadTime - b.postReadTime}).map((post, index) => {
                return(
                    index === 0
                    ? <PostCardHome key={`card-${index}`} id={post._id} authorId={post.postAuthorId} image={post.postImageURL} authorName={post.postAuthor} date={`${post.postDateMonth} ${post.postDateDay}`} title={post.postTitle} readTime={post.postReadTime} tags={post.postTags} likes={post.postLikes.likeCounter}/>
                    : <PostCardHome key={`card-${index}`} id={post._id} authorId={post.postAuthorId} authorName={post.postAuthor} date={`${post.postDateMonth} ${post.postDateDay}`} title={post.postTitle} readTime={post.postReadTime} tags={post.postTags} likes={post.postLikes.likeCounter}/>
                )
            })
        }
        </>
    )
}