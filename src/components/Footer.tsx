
import { routesItemsData } from "../data/routesItemsData"
import { termsItemsData } from "../data/termsItems"

export default function Footer () {
    return(
        <div className='bg-[rgb(229,229,229)] flex flex-col justify-center items-center text-sm p-10 gap-1'>
            <p className='text-center'><a href="" className='text-[rgb(59,73,223)] font-semibold'>DEV Community </a> 
            - A constructive and inclusive social network for software developers. With you every step of your journey.</p>
            <ul className='flex gap-2 text-[rgb(59,73,223)] w-full flex-wrap items-center justify-center'>
                {routesItemsData.map((liText, index) => (
                    index != (routesItemsData.length -1) 
                    ? <li key={`li-element-${index}`} className='flex gap-2 items-center justify-center h-[20px]'><a href="">{liText.title}</a><p className='font-black text-lg mb-2'>.</p></li> 
                    : <li key={`li-element-${index}`} className='flex gap-2 items-center justify-center h-[20px]'><a href="">{liText.title}</a></li>
                )
                )}
            </ul>
            <ul className='flex gap-2 text-[rgb(59,73,223)] w-full flex-wrap items-center justify-center'>
                {termsItemsData.map((liText, index) => (
                    index != (termsItemsData.length -1) 
                    ? <li key={`li-element-${index}`} className='flex gap-2 items-center justify-center'><a href="">{liText.title}</a><p className='font-black text-lg mb-2'>.</p></li> 
                    : <li key={`li-element-${index}`} className='flex gap-2 items-center justify-center'><a href="">{liText.title}</a></li>
                )
                )}
            </ul>
            <p className='text-center'>Built on <a href="" className='text-[rgb(59,73,223)]'>Forem</a> — the <a href="">open source</a> software that powers <a href="" className='text-[rgb(59,73,223)]'>DEV</a> and other inclusive communities.</p>
            <p className='text-center'>Made with love and <a href="" className='text-[rgb(59,73,223)]'>Ruby on Rails</a>. DEV Community © 2016 - 2023.</p>
        </div>
    )
}