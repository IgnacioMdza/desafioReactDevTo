
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ElipsisSvg } from '../assets/elipsis.svg';

interface intPostList {
    postReadTime: number,
    postAuthor: string,
    postContent: string,
    postImageURL: string,
    _id: string,
    postTags: [],
    postTitle: string,
    postComments: []
}

export default function AsideRightHome () {
    const [postsList, setPostsList] = useState<intPostList[]>([])
    useEffect(() => {
        //fetch('https://api-25-ebs.ignaciomdza.dev/posts')
        fetch('http://localhost:8080/posts')    
            .then(response => response.json())
            .then(response => {
                setPostsList(response.data);
            })
    }, [])

    // const topPost = [...postsList].sort(function(a, b) {return a.postReadTime - b.postReadTime}).shift()
    // const iaPosts = postsList.filter(item => item.postTags.find(element => element === 'ia'))
    // const techPosts = postsList.filter(item => item.postTags.find(element => element === 'development'))


    return (
        <>
            {   postsList.sort(function(a, b) {return a.postReadTime - b.postReadTime}).map((post, index) => {
                return (
                    index === 0
                    ? <article key={`article-${index}`}  className='bg-white rounded-md p-3 flex flex-col gap-4 border border-1 border-neutral-200'>
                        <div className='flex  justify-between items-center'>
                            <p className='text-sm'>{post.postAuthor}</p>
                            <ElipsisSvg className='p-[4px] scale-[150%] cursor-pointer fill-neutral-600 hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-md'/>
                        </div>
                        <img src={post.postImageURL} alt='WebAssembly' className='rounded-lg object-cover h-[170px]'/>
                        <Link to={`/Post/${post._id}`} className='underline font-bold text-[rgb(59,73,223)] text-lg'>{post.postTitle}</Link>
                        <p className='text-md'>{post.postContent.slice(0, 170)} ...</p>
                    </article>
                    : null
                )})
            }
            <article className='bg-white rounded-md flex flex-col border border-1 border-neutral-200'>
                <p className='font-semibold text-lg p-3'>#ia</p>
                { postsList.filter(item => item.postTags.find(element => element === 'ia')).map((post, index) => {
                    return(
                        <Link to={`/Post/${post._id}`} key={`link-${index}`} className='text-sm border-t cursor-pointer'><p className='p-3 hover:text-[rgb(59,73,223)]'>{post.postTitle}</p><p className='px-3 pb-3 text-neutral-500'>{post.postComments.length} comments</p></Link>
                    )
                })}
            </article>
            <article className='bg-white rounded-md flex flex-col border border-1 border-neutral-200'>
                <p className='font-semibold text-lg p-3.5'>#tech</p>
                { postsList.filter(item => item.postTags.find(element => element === 'tech')).map((post, index) => {
                    return(
                        <Link to={`/Post/${post._id}`} key={`link-${index}`} className='text-sm border-t cursor-pointer'><p className='p-3 hover:text-[rgb(59,73,223)]'>{post.postTitle}</p><p className='px-3 pb-3 text-neutral-500'>{post.postComments.length} comments</p></Link>
                    )
                })}
            </article>
        </>
    )
}