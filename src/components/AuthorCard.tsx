
import { useEffect, useState } from "react";

interface Props {
    authorId: string;
}

interface intUser {
    userImage: string;
    userLocation: string;
    userName: string;
    userLastname: string;
    userEducation: string;
    userJoined: string;
}


export default function AuthorCard (props: Props) {
    const [userAuthor, setUserAuthor] = useState<intUser>({} as intUser)

    useEffect(() => {
        // fetch(`https://api-25-ebs.ignaciomdza.dev/users/${props.authorId}`)
        fetch(`http://localhost:8080/users/${props.authorId}`)
            .then(response => response.json())
            .then(response => {
            setUserAuthor(response.data);
        })
    }, [props.authorId])


    return(
        <article className='bg-gradient-to-b from-black from-10% via-white via-5% to-white to-90% rounded-md p-3.5 flex flex-col gap-4 border border-1 border-neutral-200 min-h-[300px]'>
            <div className='flex items-center gap-3 w-full'>
                <img src={userAuthor.userImage} className='rounded-full h-12 w-12 object-cover'/>
                <a className='pt-3 font-bold text-lg cursor-pointer hover:text-[rgb(59,73,223)] w-4/5'>{userAuthor.userName} {userAuthor.userLastname}</a>
            </div>
            <button value="Continue" className="bg-[rgb(59,73,223)] rounded p-2 text-white cursor-pointer hover:bg-[rgb(47,58,178)] hover:transition-all font-semibold">Follow</button>
            <div>
                <p className='text-xs font-bold pb-1 text-neutral-600'>LOCATION</p>
                <p className='text-sm'>{userAuthor.userLocation}</p>
            </div>
            <div>
                <p className='text-xs font-bold pb-1 text-neutral-600'>EDUCATION</p>
                <p className='text-sm'>{userAuthor.userEducation}</p>
            </div>
            <div>
                <p className='text-xs font-bold pb-1 text-neutral-600'>JOINED</p>
                <p className='text-sm'>{userAuthor.userJoined}</p>
            </div>
        </article>
    )
}