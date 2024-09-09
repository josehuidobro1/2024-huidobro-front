import React from "react";

function NavBar() {

    return (
        <div className=" top-0 absolute bg-healthyGreen shadow-xl py-3 w-full flex items-center justify-center">
            <div className="flex flex-row max-w-[800px] w-full justify-between items-center ">
                <h1 className="font-belleza text-4xl text-white  ">Healthy Bite</h1>
                <button onClick={()=>console.log("cerrar sesion")} className="font-quicksand font-semibold text-md text-white hover:text-hbGreen  underline-offset-2">Log out</button>
            </div>
        </div>
    );
}

export default NavBar;
