
import { Link } from "react-router-dom";

interface intPostList {
    postAuthorId: string,
    postAuthor: string,
    _id: string,
    postTitle: string,
    postTags: []
}
interface Props {
    authorId: string;
    author: string
    posts: intPostList[]
}

export default function MoreFrom (props:Props) {
    console.log(props.posts)
    console.log(props.authorId)

    return(
        <article className='bg-white rounded-md flex flex-col border border-1 border-neutral-200'>
            <div className='flex flex-col items-start justify-start w-full p-3.5'>
                <p className='text-lg font-bold'>More from</p>
                <a className='font-bold text-lg cursor-pointer text-[rgb(59,73,223)]'>{props.author}</a>
            </div>
            {
                props.posts.filter((item) => item.postAuthorId === props.authorId).map((post, index) => {
                    return(
                        <Link key={`itemMoreFromLink-${index}`} to={`/Post/${post._id}`} className='border-t p-3.5 flex flex-col'>
                            <p className='text-sm hover:text-[rgb(59,73,223)]'>{post.postTitle}</p>
                            <div className='flex gap-3'>
                            {
                                post.postTags.map((tag, index) => {
                                    return(
                                        <p key={`pTags-${index}`}  className='text-xs text-neutral-600'>#{tag}</p>
                                    )
                                })
                            }
                            </div>
                        </Link>
                    )
                })
            }
        </article>
    )
}