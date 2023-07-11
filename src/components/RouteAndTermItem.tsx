import { Link } from "react-router-dom"

interface Props {
    route: string,
    title: string,
    icon: string,
}

export default function RouteAndTermItem (props: Props){
    return(
        <Link to={props.route} className='hover:bg-indigo-300/25 hover:text-[rgb(59,73,223)] w-full p-[6px] rounded-md flex gap-2 items-center'><p className='text-[20px]'>{props.icon}</p><p className='hover:underline'>{props.title}</p></Link>
    )
}
