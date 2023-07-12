import { useState } from "react"

import PostCardHome from "../components/PostCardHome";
import { postsFetch } from "../data/postsFetch";

interface IntPostTop {
    postAuthorId: string,
    postAuthor: string,
    _id: string,
    postTitle: string,
    postTags: Array<string> ,
    postReadTime: number,
    postDateDay: string,
    postDateMonth: string,
    postContent: string,
    postImageURL?: string,
    postLikes: {likeCounter: number},
    postRelevance?: number,
}

export default function Top () {
    const [postsList, setPostsList] = useState<IntPostTop[]>([])
    postsFetch(setPostsList)

    return(
        <>
        {
            postsList.sort(function(a, b) {return a.postReadTime - b.postReadTime}).map((post, index) => {
                return(
                    index === 0
                    ? <PostCardHome key={`card-${index}`} id={post._id} authorId={post.postAuthorId} image={post.postImageURL} authorName={post.postAuthor} date={`${post.postDateMonth} ${post.postDateDay}`} title={post.postTitle} readTime={post.postReadTime} tags={post.postTags} likes={post.postLikes.likeCounter}/>
                    : <PostCardHome key={`card-${index}`} id={post._id} authorId={post.postAuthorId} authorName={post.postAuthor} date={`${post.postDateMonth} ${post.postDateDay}`} title={post.postTitle} readTime={post.postReadTime} tags={post.postTags} likes={post.postLikes.likeCounter} image={''}/>
                )
            })
        }
        </>
    )
}