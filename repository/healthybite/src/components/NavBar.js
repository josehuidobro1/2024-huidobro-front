import { auth } from "../firebaseConfig";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faLayerGroup, faChartLine, faUser, faBars, faXmark , faUtensils, faMugHot, faStar, faComment, faCartShopping} from '@fortawesome/free-solid-svg-icons'; 
import React, { useContext, useEffect, useState } from "react";
import NavItem from "./NavItem";
import { UserContext } from "../App";

function NavBar() {
    const {setUser_id}=useContext(UserContext)
    const [openBar, setOpenBar]=useState(false)

    const handleLogOut=()=>{
        auth.signOut()
        setOpenBar(false)
        setUser_id(null)

    }
    return (
        <>
        <div className=" top-0 z-30 sticky overflow-y-hidden sm:overflow-y-auto sm:absolute  w-full flex flex-col items-center justify-center">
            <div className="bg-healthyGreen w-full  shadow-xl py-3 flex flex-col justify-center">
                <div className="flex flex-row w-11/12 md:w-full justify-between items-center bg-healthyGreen ">
                    
                    <h1 className="font-belleza text-3xl  w-3/4 lg:text-2xl text-white  md:w-full ml-4  ">Healthy Bite</h1>
                    {window.innerWidth > '768' ? 
                        <div className="flex justify-end items-center w-full mr-2 ">
                            <Link  to="/" onClick={handleLogOut}className="font-quicksand font-semibold text-sm text-healthyGreen hover:mt-1  px-3 py-1 rounded-3xl bg-white hover:bg-hbGreen  underline-offset-2">Log out</Link>
                        </div>
                        :
                        <div>
                            <FontAwesomeIcon onClick={()=>setOpenBar(!openBar)} icon={openBar ? faXmark :faBars} className="text-white text-2xl cursor-pointer " />
                        </div>
                    }
                </div>
                {window.innerWidth > '768'  &&
                <div className="flex justify-around items-center w-full pt-2 ">
                    <NavItem route='/home' name='Home' icon={faHouse}  />
                    <NavItem route='/plates' name='Plates' icon={faUtensils}/>
                    <NavItem route='/drinks' name='Drinks' icon={faMugHot}/>
                    <NavItem route='/schedule' name='Schedule' icon={faCartShopping}/>
                    <NavItem route='/dashboard' name='Dashboard' icon={faChartLine}  />
                    <NavItem route='/category' name='Category' icon={faLayerGroup}  />
                    <NavItem route='/community' name='Community' icon={faComment}  />
                    <NavItem route='/user-profile' name='User Profile' icon={faUser}  />
                    
                </div>}
            </div>
            { openBar &&
                    <div className="w-full   z-10 right-0 bg-healthyGreen  h-full flex items-center justify-center overflow-y-hidden">
                        <div className="   w-full h-screen  pb-12 py-2  px-2  flex flex-col items-center justify-around ">
                            <div className=" h-full grid grid-cols-2 gap-1 justify-around   w-full ">
                                <NavItem route='/home' name='Home' icon={faHouse} setOpenBar={setOpenBar} />
                                <NavItem route='/plates' name='Plates' icon={faUtensils} setOpenBar={setOpenBar}/>
                                <NavItem route='/drinks' name='Drinks' icon={faMugHot}  setOpenBar={setOpenBar}/>
                                <NavItem route='/schedule' name='Schedule' icon={faCartShopping} setOpenBar={setOpenBar}/>
                                <NavItem route='/dashboard' name='Dashboard' icon={faChartLine} setOpenBar={setOpenBar} />
                                <NavItem route='/category' name='Category' icon={faLayerGroup} setOpenBar={setOpenBar} />
                                <NavItem route='/community' name='Community' icon={faComment}  setOpenBar={setOpenBar} />
                                <NavItem route='/user-profile' name='User Profile' icon={faUser} setOpenBar={setOpenBar} />
                                
                            </div>
                            <Link to="/" onClick={handleLogOut} className="font-quicksand text-center relative bottom-2 my-5 font-semibold max-h-12 text-lg xm:text-xl  text-healthyGreen hover:mt-1   py-2 px-5 xs:px-1 rounded-3xl bg-white hover:bg-hbGreen  underline-offset-2">Log&nbsp;out</Link>
                        </div>
                    </div>

            }
        </div>
        
        </>
    );
}

export default NavBar;
