import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faXmark } from '@fortawesome/free-solid-svg-icons';
import alert from '../assets/celebrate.gif'

const NotificationPopup = ({ notifications, onDismiss }) => {
    if (notifications?.length === 0){ 
        return null
    }else{
        return (
            <div className="fixed bottom-0 sm:top-4 right-0 w-11/12   md:w-2/5 font-quicksand  text-white  z-50 flex flex-col ">
                {notifications.map((notification) => (
                    <div key={notification.id} className='flex flex-row bg-healthyYellow rounded-l-full shadow-lg  w-full mb-2 items-center'>
                        <div  className='flex w-1/5 md:w-3/12 lg:w-2/12 items-center justify-center rounded-full p-3  '>
                            <img src={alert} className='w-full  object-cover rounded-full'/>
                        </div>
                        <div  className=" w-3/5 md:w-8/12 lg:w-9/12  ">
                            <p className=" text-md font-semibold font-quicksand">{notification.message}</p>    
                        </div>   
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="cursor-pointer text-white text-lg w-1/5 md:w-1/12 pr-3"
                            onClick={()=>onDismiss(notification.id)}
                        />
                    </div>
                ))}
            </div>
        );
    }
};

export default NotificationPopup;

