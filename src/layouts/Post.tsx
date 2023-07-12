
import { Outlet } from 'react-router-dom'

import Footer from '../components/Footer';
import NavBarLoged from '../components/NavBarLoged';

import AsideRightPost from "../components/AsideRightPost";

export default function  Post () {
    const token = localStorage.getItem("token") || "";

    if(token === ''){
        window.location.replace("/Login");
    } else {
        return (
            <>
                <header> 
                    <NavBarLoged/>
                </header>
                <main className='bg-[rgb(240,240,240)] font-sans mt-[56px] sm:p-3'>
                    <div className='grid grid-cols-[1fr] md:grid-cols-[6fr_3fr] lg:grid-cols-[9fr_4fr] lg:max-w-[1248px] mx-auto gap-2 md:gap-3'>
                        <section className='flex flex-col gap-3'>
                            <Outlet/> 
                        </section>
                        <aside className='hidden md:table-column'>
                            <AsideRightPost/>
                        </aside>
                    </div>
                </main>
                <Footer/>
            </>
        )
    }
}

