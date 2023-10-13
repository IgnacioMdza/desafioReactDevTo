import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import PostCardContent from "../components/PostCardContent";

interface intPostList {
    postAuthorId: string,
    postAuthor: string,
    _id: string,
    postTitle: string,
    postTags: [],
    postReadTime: number,
    postDateDay: string,
    postDateMonth: string,
    postContent: string,
    postImageURL: string,
    postLikes: {likeCounter: number}
}

export default function Content () {
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
                    <PostCardContent key={`postCardContent-${index}`} title={post.postTitle} image={post.postImageURL} date={`${post.postDateDay} ${post.postDateMonth}`} authorName={post.postAuthor} readTime={post.postReadTime} tags={post.postTags} likes={post.postLikes.likeCounter} authorId={post.postAuthorId} id={post._id} content={post.postContent}/>
                )
            })
            
            }
        </>
    )
}