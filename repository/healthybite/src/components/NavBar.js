import { auth } from "../firebaseConfig";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faLayerGroup, faChartLine, faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'; 
import React, { useEffect, useState } from "react";

function NavBar() {
    const [openBar, setOpenBar]=useState(false)

    const handleLogOut=()=>{
        auth.signOut()

    }
    return (
        <>
        <div className=" top-0 z-30 sticky sm:absolute   bg-healthyGreen shadow-xl py-3 w-full flex flex-col items-center justify-center">
            <div className="flex flex-row max-w-[800px] w-11/12 lg:w-full justify-between items-center ">
                <h1 className="font-belleza text-2xl lg:text-4xl text-white  ">Healthy Bite</h1>
                {window.innerWidth > '768' ? 
                <>
                    <Link to="/" className="text-white font-quicksand text-sm hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " > <FontAwesomeIcon className="text-white text-md pr-2" icon={faHouse} />Home </Link>
                    <Link to="/category" className="text-white font-quicksand text-sm hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " ><FontAwesomeIcon className="text-white text-md pr-2" icon={faLayerGroup} />Category </Link>
                    <Link to="/dashboard" className="text-white font-quicksand text-sm hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " ><FontAwesomeIcon className="text-white text-md pr-2" icon={faChartLine} />Dashboard </Link>
                    <Link to="/user-profile" className="text-white font-quicksand text-sm hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " ><FontAwesomeIcon className="text-white text-md pr-2" icon={faUser} />User Profile </Link>
                    <Link to="/"  onClick={()=>auth.signOut()} className="font-quicksand font-semibold text-sm text-healthyGreen hover:mt-1  px-3 py-1 rounded-3xl bg-white hover:bg-hbGreen  underline-offset-2">Log out</Link>
                </>
                :
                <div>
                <FontAwesomeIcon onClick={()=>setOpenBar(!openBar)} icon={openBar ? faXmark :faBars} className="text-white text-lg cursor-pointer" />
                
                </div>
                }
            </div>
            { openBar &&
                    <div className="w-full  xs:absolute z-10 right-0  xs:top-16    flex items-center justify-center">
                        <div className="bg-healthyGreen xs:shadow-lg w-11/12 h-screen xs:h-full sm:w-10/12 pb-12 xs:pb-2 py-2  px-3 xs:rounded-3xl flex flex-col xs:flex-row  items-center justify-around ">
                            <Link to="/" className="text-white font-quicksand text-xl xs:text-xs hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " > <FontAwesomeIcon className="text-white text-md pr-2" icon={faHouse} />Home </Link>
                            <Link to="/" className="text-white font-quicksand text-xl xs:text-xs hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " ><FontAwesomeIcon className="text-white text-md pr-2" icon={faLayerGroup} />Category </Link>
                            <Link to="/" className="text-white font-quicksand text-xl xs:text-xs hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " ><FontAwesomeIcon className="text-white text-md pr-2" icon={faChartLine} />Dashboard </Link>
                            <Link to="/user-profile" className="text-white font-quicksand text-xl xs:text-xs hover:mt-1 hover:underline-offset-2 hover:border-b-1 hover:border-b-white  " ><FontAwesomeIcon className="text-white text-md pr-2" icon={faUser} />User Profile </Link>
                            <Link to="/" onClick={()=>auth.signOut()} className="font-quicksand font-semibold text-xl xs:text-sm text-healthyGreen hover:mt-1  px-4 py-2 xs:px-3 xs:py-1 rounded-3xl bg-white hover:bg-hbGreen  underline-offset-2">Log out</Link>
                        </div>
                    </div>

            }
        </div>
        
        </>
    );
}

export default NavBar;
