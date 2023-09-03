import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ReactComponent as TagSvg } from '../assets/tag.svg';
import { ReactComponent as ElipsisSvg } from '../assets/elipsis.svg';
import { ReactComponent as BSvg } from '../assets/newPost/bSvg.svg';
import { ReactComponent as ISvg } from '../assets/newPost/iSvg.svg';
import { ReactComponent as ClipSvg } from '../assets/newPost/clip.svg';
import { ReactComponent as ListNSvg } from '../assets/newPost/listN.svg';
import { ReactComponent as ListDSvg } from '../assets/newPost/listD.svg';
import { ReactComponent as HSvg } from '../assets/newPost/hSvg.svg';
import { ReactComponent as MarksSvg } from '../assets/newPost/marks.svg';
import { ReactComponent as FrameSvg } from '../assets/newPost/frame.svg';

interface IntEditPost {
    postAuthorId: string,
    postAuthor: string,
    _id: string,
    postTitle: string,
    postTags: any,
    postReadTime: number,
    postDate: Date,
    postDateDay: string,
    postDateMonth: string,
    postContent: string,
    postImageURL: string,
    postLikes?: {likeCounter: number},
    postComments?: [],
}

export default function EditPost () {
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState<IntEditPost>({} as IntEditPost)

    const { postid } = useParams()
    console.log(postid)

    useEffect(() => {
        // fetch(`https://api-25-ebs.ignaciomdza.dev/posts/${postid}`)
        fetch(`https://localhost:8080/posts/${postid}`)
        .then(response => response.json())
        .then(response => {
            setPost(response.data);
            setIsLoading(false)
        })
    }, [postid])


    const token = localStorage.getItem("token") || "";

    if(token === ''){
        window.location.replace("/Login");
    } else {
        const navigate = useNavigate()
        const { handleSubmit, register } = useForm<IntEditPost>();
    
        const token = localStorage.getItem("token") || "";
        const payload = token.split(".")[1];
        const destructuracion = atob(payload);
        const postAuthorId:string = JSON.parse(destructuracion).id;
        const postAuthor: string = JSON.parse(destructuracion).userName;
    
        function onSubmit( data: IntEditPost ){
            if(data.postContent === '') { data.postContent = post.postContent }
            if(data.postImageURL === '') { data.postImageURL = post.postImageURL }
            if(data.postTitle === '') { data.postTitle = post.postTitle  }
            if(data.postTags === '') { data.postTags = post.postTags.join(' ') }

            // fetch(`https://api-25-ebs.ignaciomdza.dev/posts/${postid}`, {
            fetch(`https://localhost:8080/posts/${postid}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                postAuthor: postAuthor,
                postAuthorId: postAuthorId,
                postRelevance: Math.ceil(Math.random() * 10),
                postDateDay: new Date().toDateString().split(" ").slice(2, 3)[0],
                postDateMonth: new Date().toDateString().split(" ").slice(1, 2)[0],
                postDate: new Date(),
                postContent: data.postContent,
                postImageURL: data.postImageURL,
                postTitle: data.postTitle,
                postTags: data.postTags.split(" ").slice(0, 4),
                postReadTime: Math.round((data.postContent.length * 0.1)/60),
            }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log("response: ", response);
                toast.success("Post actualizado con éxito", {autoClose: 2000,});
                setTimeout(() => navigate("/"), 2000); 
            })
            .catch(() => {
                alert("falló el fetch");
            });
        }
    if (isLoading) { 
        return (
            null
        );
    }

    return (
        <>  
            <header>
                <div className='h-14 bg-[rgb(245,245,245)] w-screen'>
                    <div className='max-w-screen px-3 lg:max-w-[1248px] mx-auto flex justify-between items-center h-full'>
                        <div className='flex gap-4 items-center justify-between sm:w-3/5 w-full'>
                            <div className='flex items-center gap-3'>
                                <Link to='/'><img src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' alt='dev' className='h-[40px] min-w-fit'/></Link>
                                <p className='font-semibold hidden min-[350px]:inline-flex'>Edit Post</p>
                            </div>
                            <div className='flex items-center gap-3 max-[400px]:gap-1'>
                                <a className='p-2 hover:text-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer'>Edit</a>
                                <a className='p-2 hover:text-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer'>Preview</a>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center justify-between'>
                            <Link to='/' className='text-lg font-bold py-2 px-3'>X</Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className='bg-[rgb(245,245,245)] font-sans p-3 sm:p-3 h-screen'>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
                <form className='mx-auto max-w-[640px] flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <div className='bg-white w-full flex flex-col rounded-t-lg px-4 py-2 sm:px-[48px] sm:py-[24px] gap-2 justify-between items-start border-t border-s border-e'>
                        <div className='flex flex-col gap-2 w-full'>
                            <a className='p-2 border-2 border-neutral-300 rounded-md cursor-pointer text-center max-w-fit'>Add a cover image</a>
                            <input
                            type="text"
                            placeholder={post.postImageURL}
                            className="outline-none bg-white border-b border-neutral-300 rounded text-black w-full placeholder-neutral-500"
                            {...register('postImageURL', { required: {value: false, message: 'URL de imagen requerida'}})}
                            />
                            <input
                            type="number"
                            placeholder={post.postReadTime.toString()}
                            className="outline-none bg-white border-b border-neutral-300 rounded text-black w-full pt-4 placeholder-neutral-500"
                            {...register('postReadTime', { required: {value: false, message: 'Tiempo de lectura requerido'}})}
                            />
                            <input
                            type="text"
                            placeholder={post.postTitle}
                            className="outline-none bg-white max-[400px]:text-2xl text-4xl sm:text-5xl font-bold border-neutral-300 rounded text-black w-full pt-4 placeholder-neutral-600"
                            {...register('postTitle', { required: {value: false, message: 'Título requerido'}})}
                            />
                            <input
                            type="text"
                            placeholder={ `#${post.postTags.join(' #')}` }
                            className="outline-none bg-white  border-neutral-300 rounded text-black w-full pt-4 placeholder-neutral-500"
                            {...register('postTags', { required: {value: false, message: 'Tags requeridos'}})}
                            />
                        </div>
                    </div>
                    <div className='bg-neutral-200/50 h-14 flex px-4 py-2 sm:px-[48px] sm:py-[24px] items-center justify-between border-s border-e w-full'>
                        <div className='flex gap-5 items-center max-[400px]:justify-between max-[400px]:w-full justify-between'>
                            <BSvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                            <ISvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                            <ClipSvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                            <ListNSvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                            <ListDSvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                            <HSvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                            <MarksSvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                            <FrameSvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                        </div>
                        <div className='hidden min-[400px]:inline-flex'>
                            <ElipsisSvg className='rotate-90 p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                        </div>
                    </div>
                    <div className='bg-white w-full px-4 py-2 sm:px-[48px] sm:py-[24px] border-b border-s border-e rounded-b-lg'>
                        <div>
                            <textarea
                            placeholder={post.postContent}
                            className="outline-none bg-white text-xl border-neutral-300 rounded text-black w-full pt-4 placeholder-neutral-500 font-light h-[250px]"
                            {...register('postContent', { required: {value: false, message: 'Contenido del post requerido'}})}
                            />
                        </div>
                    </div>
                    <div className='my-5 flex gap-3 items-center flex-col sm:flex-row'>
                        <input
                        type="submit"
                        value="Update"
                        className="bg-[rgb(59,73,223)] rounded py-2 px-3 text-white cursor-pointer hover:bg-[rgb(47,58,178)] hover:transition-all w-full sm:w-fit"
                        />
                        <a className='p-2 hover:text-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer'>Save Draft</a>
                        <TagSvg className='p-[5px] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer scale-[175%]'/>
                        <a className='p-2 hover:text-[rgb(59,73,223)] hover:bg-indigo-300/30 rounded-md cursor-pointer'>Revert new changes</a>
                    </div>
                </form>
            </main>
        </>
    )}
}