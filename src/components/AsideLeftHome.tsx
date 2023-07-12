import RouteAndTermItem from "./RouteAndTermItem"

import { routesItemsData } from "../data/routesItemsData"
import { termsItemsData } from "../data/termsItems"

import FacebookSvg from '../assets/facebook.svg';
import InstagramSvg  from '../assets/instagram.svg';
import GithubSvg  from '../assets/github.svg'
import TwitterbSvg  from '../assets/twitterb.svg';
import TwitchSvg  from '../assets/twitch.svg';
import MastodonSvg  from '../assets/mastodon.svg';
import TagSvg  from '../assets/tag.svg';
import ElipsisSvg  from '../assets/elipsis.svg';
import CircleSvg  from '../assets/circle.svg';

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
                <div className='flex justify-between p-[7px] w-full'>
                        <img src={TwitterbSvg} className='p-[4px] h-[32px] hover:bg-indigo-300/25 rounded-md'/>
                        <img src={FacebookSvg} className='p-[4px] h-[32px] hover:bg-indigo-300/25 rounded-md'/>
                        <img src={GithubSvg} className='p-[4px] h-[32px] hover:bg-indigo-300/25 rounded-md'/>
                        <img src={InstagramSvg} className='p-[4px] h-[32px] hover:bg-indigo-300/25 rounded-md'/>
                        <img src={TwitchSvg} className='p-[4px] h-[32px] hover:bg-indigo-300/25 rounded-md'/>
                        <img src={MastodonSvg} className='p-[4px] h-[32px] hover:bg-indigo-300/25 rounded-md'/>
                </div>
                <div>
                    <div className='flex justify-between items-center p-[7px]'>
                        <p className='font-bold text-[16px]'>My Tags</p>
                        <img src={TagSvg} className='p-[5px] h-[40px] hover:bg-indigo-300/25 rounded-md'/>
                    </div>
                    <RouteAndTermItem route='/' icon='#' title='python'/>
                </div>
            </article>
            <article className='bg-white rounded-md p-3.5 flex flex-col gap-4'>
                <div className='flex  justify-between items-center'>
                    <p className='text-xs'>DEV Community</p>
                    <img src={ElipsisSvg} className='cursor-pointer p-[5px] h-[30px] hover:bg-indigo-300/25 rounded-md'/>
                </div>
                <img src='https://res.cloudinary.com/practicaldev/image/fetch/s--0VA_opuX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_350/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r958p7649efealx01xe6.png' alt='WebAssembly' className='rounded-lg  object-cover'/>
                <a className='underline font-bold text-[rgb(59,73,223)] cursor-pointer'>Immerse yourself in the WebAssembly ecosystem ✅</a>
            </article>
            <article className='bg-white rounded-md p-3.5 flex flex-col gap-4'>
                <div className='flex justify-between items-center'>
                    <p className='text-xs'>DEV Community</p>
                    <img src={ElipsisSvg} className='cursor-pointer p-[5px] h-[30px] hover:bg-indigo-300/25 rounded-md'/>
                </div>
                <p>DEV runs on 100% open source code known as <a className='underline text-[rgb(59,73,223)] cursor-pointer'>Forem</a>.</p>
                <p>Contribute to the codebase or host your own!</p>
                <p className='font-bold text-[16px]'>Check these out! 👇</p>
                <div className='px-2'>
                    <div className='flex gap-3 items-center'>
                        <img src={CircleSvg}/>
                        <a className='underline text-[rgb(59,73,223)] cursor-pointer'>Main Forem Repo</a>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <img src={CircleSvg}/>
                        <a className='underline text-[rgb(59,73,223)] cursor-pointer'>Self-Host Instructions</a>
                    </div>
                </div>
            </article>
        </>
    )
}