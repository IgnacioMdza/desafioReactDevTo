
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
    title: string
    image?: string;
    date: string;
    authorImage?: string;
    authorName: string;
    readTime: number;
    tags: [];
    likes?: number;
    authorId?: string;
    id: string;
    content: string
}
interface intUser {
    userImage: string;
}


export default function PostCardContent (props: Props) {
    const navigate = useNavigate()
    const { postid } = useParams()
    const [userAuthor, setUserAuthor] = useState<intUser>({} as intUser)
    let postAuthorId= ''

    const token = localStorage.getItem("token") || ''
    if (token != ''){
        const payload = token.split(".")[1]
        const destructuracion = atob(payload)
        postAuthorId = JSON.parse(destructuracion).id
    }
    

    function deletePost () {
        fetch(`https://api-25-ebs.ignaciomdza.dev/posts/${postid}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((response) => {
            console.log("response: ", response);
            toast.warning("Post eliminado", {autoClose: 2000,});
            setTimeout(() => navigate("/"), 2000); 
        })
        .catch(() => {
            toast.error("falló el fetch");
        });
    }

    useEffect(() => {
        fetch(`https://api-25-ebs.ignaciomdza.dev/users/${props.authorId}`)
        .then(response => response.json())
        .then(response => {
            setUserAuthor(response.data);
            console.log(response.data)
        })
    }, [props.authorId])

    return (
        <article className='bg-white flex flex-col rounded-lg border'>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <img src={props.image} alt={props.title} className='rounded-t-lg h-[450px] object-cover'/>
            <div className='py-5 px-3 flex flex-col gap-4 md:px-5 lg:px-10'>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2'>
                        <img src={userAuthor?.userImage} className='rounded-full h-9 w-9 border border-neutral-400 object-cover'/>
                        <div className='flex flex-col items-start'>
                            <button className='font-semibold text-sm hover:bg-neutral-400/10 rounded-md '>{props.authorName}</button>
                            <p className='text-xs'>Posted on {props.date}</p>
                        </div>
                    </div>
                    {   token != ''
                            ?   <div className='flex gap-2'>
                                    {
                                        postAuthorId === props.authorId
                                        ? <Link to={`/EditPost/${props.id}`} className='bg-[rgb(240,240,240)] py-1 px-4 rounded-md text-black border border-[rgb(59,73,223)] hover:bg-[rgb(59,73,223)] hover:text-white'>Edit</Link>
                                        :  null
                                    }
                                    {   
                                        postAuthorId === props.authorId
                                        ? <button onClick={deletePost} className='bg-[rgb(240,240,240)] py-1 px-2 rounded-md text-black border border-red-700 hover:bg-red-700 hover:text-white'>Delete</button>
                                        :  null
                                    }
                                </div>
                            :   null
                    }
                </div>
                <div className=' flex gap-6 items-center'>
                    <button className='flex items-center'>
                        <p className='text-xl'>💖</p>
                        <p className='text-md'>{props.likes}</p>
                    </button>
                    <div className='flex items-center'>
                        <p className='text-xl'>🦄</p>
                        <p className='text-md'>0</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='text-xl'>🤯</p>
                        <p className='text-md'>0</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='text-xl'>🙌</p>
                        <p className='text-md'>0</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='text-xl'>🔥</p>
                        <p className='text-md'>0</p>
                    </div>
                </div>
                <h2 className='text-4xl font-black'>{props.title}</h2>
                <div className='flex gap-2'>
                    {
                        props.tags.map((tag, index) => {
                            return (
                                <button key={`button-${index}`} className='text-md hover:text-[rgb(59,73,223)] hover:bg-[rgb(59,73,223,.1)] p-1 border border-white rounded-md hover:border-[rgb(59,73,223,.3)] hover:border-1 hover:border'>#{tag}</button>
                            )
                        })
                    }
                </div>
                <div className='leading-9 text-lg '>
                    <p>{props.content}</p>
                </div>
            </div>
            
        </article>
    )
}