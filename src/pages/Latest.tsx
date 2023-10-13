import { useState, useEffect } from "react"

import PostCardHome from "../components/PostCardHome";

interface IntPostLatest {
    postAuthorId: string,
    postAuthor: string,
    _id: string,
    postTitle: string,
    postTags: Array<string> ,
    postReadTime: number,
    postDate: Date,
    postDateDay: string,
    postDateMonth: string,
    postContent: string,
    postImageURL?: string,
    postLikes: {likeCounter: number}
}

export default function Latest () {
    const [postsList, setPostsList] = useState<IntPostLatest[]>([])
    useEffect(() => {
        //fetch('https://api-25-ebs.ignaciomdza.dev/posts')
        fetch('http://localhost:8080/posts')
            .then(response => response.json())
            .then(response => {
                setPostsList(response.data);
            })
    }, [])

    return(
        <>
        {
            postsList.sort(function(a, b) {return new Date(b.postDate).valueOf() - new Date(a.postDate).valueOf()}).map((post, index) => {
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