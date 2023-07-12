import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { ReactComponent as CommentSvg } from '../assets/comment.svg';
import { ReactComponent as SaveSvg } from '../assets/save.svg';

interface Props {
    title: string
    image?: string;
    date: string;
    authorImage?: string;
    authorName: string;
    readTime: number;
    tags: string[];
    likes: number;
    authorId?: string
    id: string
}

// userAuthor.userImage

export default function PostCardHome (props: Props) {
    const [userAuthor, setUserAuthor] = useState<any>([])

    useEffect(() => {
        fetch(`http://localhost:8080/users/${props.authorId}`)
        .then(response => response.json())
        .then(response => {
            setUserAuthor(response.data);
            console.log(response.data)
        })
    }, [props.authorId])

    return (
        <article className='bg-white flex flex-col rounded-lg border'>
            { props.image === ''
                ? <img src={props.image} alt={props.title} className='rounded-t-lg h-[250px] object-cover'/>
                : null
            }
            <div className='py-5 px-3 flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                    <img src={userAuthor.userImage} className='rounded-full h-9 w-9 border border-neutral-400 object-cover'/>
                    <div className='flex flex-col'>
                        <button className='font-semibold text-sm hover:bg-neutral-400/10 rounded-md '>{props.authorName}</button>
                        <p className='text-xs'>{props.date}</p>
                    </div>
                </div>
                <Link to={`/Post/${props.id}`}><h2 className='text-2xl font-bold px-10 hover:text-[rgb(59,73,223)]'>{props.title}</h2></Link>
                <div className='flex px-10 gap-2'>
                    {
                        props.tags.map((tag, index) => {
                            return (
                                <button key={`button-${index}`} className='text-sm hover:text-[rgb(59,73,223)] hover:bg-[rgb(59,73,223,.1)] p-1 border border-white rounded-md hover:border-[rgb(59,73,223,.3)] hover:border-1 hover:border'>#{tag}</button>
                            )
                        })
                    }
                </div>
                <div className='flex items-center justify-between px-10'>
                    <div className='w-2/5 '>
                        <button className='hover:bg-neutral-400/20 p-2 rounded-md'>
                            <p className='text-sm'>💘🦄😮🙌🔥{props.likes} reactions</p>
                        </button>
                    </div>
                    <div className='flex w-3/5 justify-between items-center'>
                        <button className='hover:bg-neutral-400/20 p-2 rounded-md flex items-center gap-3'>
                            <CommentSvg/>
                            <p className='text-sm'>Add Comment</p>
                        </button>
                        <div className='flex items-center gap-1'>
                            <p className='text-xs'>{props.readTime} min read</p>
                            <SaveSvg className='p-3 text-[20px] hover:bg-indigo-300/30 rounded-md cursor-pointer'/>
                        </div>
                    </div>
                </div>
            </div>
            
        </article>
    )
}