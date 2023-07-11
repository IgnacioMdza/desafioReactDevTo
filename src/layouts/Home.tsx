import { useEffect, useState } from "react"
import { Outlet, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';
import NavBarLoged from '../components/NavBarLoged';
import AsideLeftHome from "../components/AsideLeftHome";
import RLTLink from "../components/RLTLink";
import AsideRightHome from "../components/AsideRightHome";

import Relevant from "../pages/Relevant";


export default function Home () {
    const navigate = useNavigate()
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
                    <div className='grid grid-cols-[1fr] md:grid-cols-[2fr_5fr] lg:grid-cols-[3fr_8fr_4fr] lg:max-w-[1248px] mx-auto gap-2 md:gap-3'>
                        <aside className='hidden md:table-column'>
                            <div className='flex flex-col gap-4'>
                                <AsideLeftHome/>
                            </div>
                        </aside>
                        <section className='flex flex-col gap-3'>
                            <div className='flex gap-1'>
                                { location.pathname === '/' || location.pathname === '/Relevant'
                                ? <RLTLink toRoute='/Relevant' text='Relevant' isLocated/>
                                : <RLTLink toRoute='/Relevant' text='Relevant' isLocated={false}/> }
                                { location.pathname === '/Latest'
                                ? <RLTLink toRoute='/Latest' text='Latest' isLocated/>
                                : <RLTLink toRoute='/Latest' text='Latest' isLocated={false}/> }
                                { location.pathname === '/Top'
                                ? <RLTLink toRoute='/Top' text='Top' isLocated/>
                                : <RLTLink toRoute='Top' text='Top' isLocated={false}/> }
                            </div>
                            {   location.pathname === '/'
                                ? <Relevant/>
                                : <Outlet/> }
                        </section>
                        <aside className='hidden lg:table-column'>
                            <div className='flex flex-col gap-4'>
                                <AsideRightHome/>
                            </div>
                        </aside>
                    </div>
                </main>
                <Footer/>
            </>
        )
    }
}