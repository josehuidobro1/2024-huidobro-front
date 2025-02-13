import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavItem = ({route, name, icon, setOpenBar}) => {
  return (
    <>
        {window.innerWidth > '768' ? 
            <Link  to={route} className="text-white  font-quicksand flex items-center text-sm hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " > 
                <FontAwesomeIcon className="text-white text-md pr-2" icon={icon} />
                <p>{name}</p>
            </Link>
        :
            <Link onClick={()=>setOpenBar(false)} to={route} className="text-white flex flex-col bg-white/20 hover:bg-white/30 w-full h-full shadow-sm rounded-lg  items-around justify-center  font-quicksand" > 
                <FontAwesomeIcon className=" text-3xl " icon={icon} />
                <p className=' text-center text-lg mt-6 font-semibold '>{name}</p>
            </Link>
        }

    </>
  )
}

export default NavItem