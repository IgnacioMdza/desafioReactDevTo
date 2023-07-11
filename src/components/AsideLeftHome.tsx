import RouteAndTermItem from "./RouteAndTermItem"

import { routesItemsData } from "../data/routesItemsData"
import { termsItemsData } from "../data/termsItems"

import { ReactComponent as FacebookSvg } from '../assets/facebook.svg';
import { ReactComponent as InstagramSvg } from '../assets/instagram.svg';
import { ReactComponent as GithubSvg } from '../assets/github.svg'
import { ReactComponent as TwitterSvg } from '../assets/twitter.svg';
import { ReactComponent as TwitchSvg } from '../assets/twitch.svg';
import { ReactComponent as MastodonSvg } from '../assets/mastodon.svg';
import { ReactComponent as TagSvg } from '../assets/tag.svg';
import { ReactComponent as ElipsisSvg } from '../assets/elipsis.svg';
import { ReactComponent as CircleSvg } from '../assets/circle.svg';

export default function AsideLeftHome () {
    return (
        <>
            <article className='w-full flex flex-col gap-3'>
                <div className='text-[17px] text-neutral-600 flex flex-col w-full'>
                    {   routesItemsData.map((item, index) => 
                        <RouteAndTermItem key={`item-${index}`} route={item.route} icon={item.icon} title={item.title}/> )    }
                </div>
                <div className='text-[17px] text-neutral-600 flex flex-col w-full'>
                    <p className='p-[7px] font-bold text-[16px]'>Other</p>
                    {   termsItemsData.map((item, index) => 
                        <RouteAndTermItem key={`item-${index}`}  route={item.route} icon={item.icon} title={item.title}/> )    }
                </div>
                <div className='flex gap-5 p-[7px]'>
                        <TwitterSvg className='fill-neutral-700 p-[4px] scale-[180%] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-sm'/>
                        <FacebookSvg className='fill-neutral-700 p-[4px] scale-[180%] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-sm'/>
                        <GithubSvg className='fill-neutral-700 p-[4px] scale-[180%] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-sm'/>
                        <InstagramSvg className='fill-neutral-700 p-[4px] scale-[180%] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-sm'/>
                        <TwitchSvg className='fill-neutral-700 p-[4px] scale-[180%] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-sm'/>
                        <MastodonSvg className='fill-neutral-700 p-[4px] scale-[180%] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-sm'/>
                </div>
                <div>
                    <div className='flex justify-between items-center p-[7px]'>
                        <p className='font-bold text-[16px]'>My Tags</p>
                        <TagSvg className='fill-neutral-700 p-[4px] scale-[180%] hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-sm'/>
                    </div>
                    <RouteAndTermItem route='/' icon='#' title='python'/>
                </div>
            </article>
            <article className='bg-white rounded-md p-3.5 flex flex-col gap-4'>
                <div className='flex  justify-between items-center'>
                    <p className='text-xs'>DEV Community</p>
                    <ElipsisSvg className='cursor-pointer  p-[4px] scale-[150%] fill-neutral-600 hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-md'/>
                </div>
                <img src='https://res.cloudinary.com/practicaldev/image/fetch/s--0VA_opuX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_350/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r958p7649efealx01xe6.png' alt='WebAssembly' className='rounded-lg  object-cover'/>
                <a className='underline font-bold text-[rgb(59,73,223)] cursor-pointer'>Immerse yourself in the WebAssembly ecosystem ✅</a>
            </article>
            <article className='bg-white rounded-md p-3.5 flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <p className='text-xs'>DEV Community</p>
                    <ElipsisSvg className='cursor-pointer p-[4px] scale-[150%] fill-neutral-600 hover:fill-[rgb(59,73,223)] hover:bg-indigo-300/25 rounded-md'/>
                </div>
                <p>DEV runs on 100% open source code known as <a className='underline text-[rgb(59,73,223)] cursor-pointer'>Forem</a>.</p>
                <p>Contribute to the codebase or host your own!</p>
                <p className='font-bold text-[16px]'>Check these out! 👇</p>
                <div className='px-2'>
                    <div className='flex gap-3 items-center'>
                        <CircleSvg/>
                        <a className='underline text-[rgb(59,73,223)] cursor-pointer'>Main Forem Repo</a>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <CircleSvg/>
                        <a className='underline text-[rgb(59,73,223)] cursor-pointer'>Self-Host Instructions</a>
                    </div>
                </div>
            </article>
        </>
    )
}