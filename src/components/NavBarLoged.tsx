import { Link } from 'react-router-dom'
import { useState } from 'react';

import { ReactComponent as SearchSvg } from '../assets/search.svg';
import { ReactComponent as BellSvg } from '../assets/bell.svg';

export default function NavBarLoged () {

    const token = localStorage.getItem("token") || "";
    const payload = token.split(".")[1];
    const destructuracion = atob(payload);
    const userImage = JSON.parse(destructuracion).userImage;

    const logout = () => {
        localStorage.clear();
        window.location.replace("/Login");
    }

    return(
        <div className='bg-white shadow-sm h-14 m-0 fixed w-screen z-10 top-0'>
            <div className='max-w-screen px-3 lg:max-w-[1248px] mx-auto flex justify-between items-center h-full'>
                <div className='flex gap-4 items-center justify-between'>
                    <Link to='/'><img src='https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png' alt='dev' className='h-[40px]'/></Link>
                    <form className='relative hidden md:inline-flex'>
                        <input type='text' placeholder="Search..." className='h-[40px] rounded-md border border-gray-200 px-3 w-[400px] outline-[rgb(59,73,223)]'></input>
                        <button className='right-[0px] w-[40px] h-full z-10 absolute hover:bg-indigo-300/30 rounded-md'><SearchSvg className='mx-auto'/></button>
                    </form>
                </div>
                <div className='flex gap-4 items-center justify-between'>
                    <Link to='/NewPost' className='hover:underline hover:text-white font-semibold text-[rgb(59,73,223)] hover:bg-[rgb(59,73,223)] rounded-md py-2 px-3 border border-1 border-[rgb(59,73,223)]'>Create Post</Link>
                    <BellSvg className='text-4xl p-2 hover:bg-indigo-300/30 rounded-md'/>
                    <button onClick={logout}><img src={userImage} alt='userImage' className='rounded-full h-[38px]'/></button>
                </div>
            </div>
        </div>
        
    )
}