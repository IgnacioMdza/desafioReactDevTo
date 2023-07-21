
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Footer from '../components/Footer';
import NavBarLoged from '../components/NavBarLoged';
import AsideLeftHome from "../components/AsideLeftHome";
import AsideRightHome from "../components/AsideRightHome";
import NavBar from '../components/NavBar';

import Relevant from "../pages/Relevant";

export default function Home () {
    const token = localStorage.getItem("token") || "";
    const navigate = useNavigate()
    return (
        <>
            <header>
                {   token != ''
                    ? <NavBarLoged/>
                    : <NavBar/>
                }
            </header>
            <main className='bg-[rgb(240,240,240)] font-sans mt-[56px] sm:p-3'>
                <div className='grid grid-cols-[1fr] md:grid-cols-[2fr_5fr] lg:grid-cols-[3fr_8fr_4fr] lg:max-w-[1248px] mx-auto gap-2 md:gap-3'>
                    <aside className='hidden md:table-column'>
                        <div className='flex flex-col gap-4'>
                            <AsideLeftHome/>
                        </div>
                    </aside>
                    <section className='flex flex-col gap-3'>
                        {   location.pathname === '/' || location.pathname === '/Relevant' || location.pathname === '/Latest' || location.pathname === '/Top' 
                            ? <div className='flex gap-1'>
                                <div>
                                { location.pathname === '/' || location.pathname === '/Relevant'
                                ? <button onClick={()=> navigate('/Relevant')} className='font-bold p-2 text-lg hover:bg-white rounded-md hover:text-[rgb(59,73,223)]'>Relevant</button>
                                : <button onClick={()=> navigate('/Relevant')} className='p-2 text-lg hover:bg-white rounded-md hover:text-[rgb(59,73,223)]'>Relevant</button>
                                }
                                </div>
                                <div>
                                { location.pathname === '/Latest'
                                ? <button onClick={()=> navigate('/Latest')} className='font-bold p-2 text-lg hover:bg-white rounded-md hover:text-[rgb(59,73,223)]'>Latest</button>
                                : <button onClick={()=> navigate('/Latest')} className='p-2 text-lg hover:bg-white rounded-md hover:text-[rgb(59,73,223)]'>Latest</button>
                                }
                                </div>
                                <div>
                                { location.pathname === '/Top'
                                ? <button onClick={()=> navigate('/Top')} className='font-bold p-2 text-lg hover:bg-white rounded-md hover:text-[rgb(59,73,223)]'>Top</button>
                                : <button onClick={()=> navigate('/Top')} className='p-2 text-lg hover:bg-white rounded-md hover:text-[rgb(59,73,223)]'>Top</button>
                                }
                                </div>
                            </div>
                            : null
                        }
                        {   
                            location.pathname === '/'
                            ? <Relevant/>
                            : <Outlet/> 
                        }
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
