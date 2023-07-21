import { useState } from "react"
import { Link } from "react-router-dom";

import PostCardHome from "../components/PostCardHome";
import { useParams } from "react-router-dom"
import { postsFetch } from "../data/postsFetch";

interface IntPostRelevance {
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
    postRelevance: number,
}

export default function Search () {
    const { searchWords } = useParams()
    const [postsList, setPostsList] = useState<IntPostRelevance[]>([])
    postsFetch(setPostsList)
    console.log(searchWords)
    const filterWords : string = searchWords?.split("-").join(" ").toLowerCase() ?? ''

    return(
        <>  
            {   filterWords === 'empty search'
            ?   <Link to='/' className='flex gap-2 justify-center border hover:text-white hover:bg-[rgb(59,73,223,0.75)] border-[rgb(59,73,223,0.75)] rounded-lg bg-white/50 p-1'>
                    <h2 className='text-lg font-normal'>{filterWords} 👻</h2>
                    {/* <h2 className='text-lg font-light'>Press to return home</h2> */}
                </Link>
            :   <div className='flex gap-2 justify-center border border-white rounded-lg bg-white/50 p-1'>
                    {/* <h2 className='text-lg font-light'>Titles that includes:</h2> */}
                    <h2 className='text-lg font-semibold'>{filterWords}</h2>
                </div>
            }
            {   postsList.filter(item => item.postTitle.toLowerCase().includes(filterWords)).length != 0
                ? postsList.filter(item => item.postTitle.toLowerCase().includes(filterWords)).map((post, index) => {
                    return(
                        <PostCardHome key={`card-${index}`} id={post._id} authorId={post.postAuthorId} authorName={post.postAuthor} date={`${post.postDateMonth} ${post.postDateDay}`} title={post.postTitle} readTime={post.postReadTime} tags={post.postTags} likes={post.postLikes.likeCounter} image={''}/>
                    )
                })
                : filterWords != 'empty search'? <h1  className='mx-auto m-2 text-[rgb(59,73,223,0.75)]'> Sorry, we couldn't find post about {filterWords}</h1> : null
            }
        </>
    )
}