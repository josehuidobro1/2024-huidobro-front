import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import noPlateImage from '../../../assets/noPlateImage.jpg'
import Comment from './Comment'
import Comments from './Comments'
import Ingridients from './Ingridients'
import { Plates } from '../../Plates/Plates'
import { auth } from "../../../firebaseConfig";

const Card = ({ plate }) => {
    const [openDetails, setOpenDetails] = useState(false)
    const [showIngredients, setShowIngredients] = useState(true)
    const scoreValue = plate.reviews.map((item) => item.score)
    const [value, setValue] = useState(plate.reviews[0].comments.find((val) => val.id_User === auth.currentUser) || { idUser: 1, score: null, comments: [] })
    const [scores, setScores] = useState(plate.reviews[0].score)
    const comments = (plate.reviews.map((item) => item.comments))

    const saveChanges = () => {
        console.log(value)
        setOpenDetails(false)
    }

    return (
        <div className={`rounded-xl bg-white shadow-md flex justify-center items-center ${openDetails ? 'w-full sm:w-1/2 md:w-1/3 lg:w-full h-80 md:h-72 flex-row' : 'w-full sm:w-1/3 md:w-1/4 h-64 sm:h-80 lg:h-64 flex-col'} m-2`}>
            <div className={`flex items-center justify-center ${openDetails ? 'h-full rounded-tl-xl w-1/4 sm:w-1/3' : 'w-full h-2/3 rounded-t-xl'}`}>
                <img src={plate.image ? plate.image : noPlateImage} alt={plate.name} className={`w-full object-cover h-full ${openDetails ? 'rounded-l-xl' : 'rounded-t-xl'}`} />
            </div>
            <div className={`pb-3 pt-2 px-3 flex flex-col ${openDetails ? 'w-3/4 sm:w-2/3 items-between justify-between h-full' : 'w-full h-1/3 justify-between items-center'}`}>
                <div className='flex flex-col justify-start items-center w-full'>
                    <div className='flex items-center justify-between w-full'>
                        <h1 className='text-md font-semibold text-healthyDarkGray1 text-left w-9/12'>{plate.name}</h1>
                        <div className='flex justify-end items-center text-md text-healthyYellow w-3/12'>
                            <p className='font-bold pr-1'>{scores}</p>
                            <FontAwesomeIcon icon={faStar} className='text-healthyYellow' />
                        </div>
                    </div>
                    {!openDetails && <p className='text-xs text-healthyGray1 w-full text-left'>{comments.length} comments</p>}
                </div>
                {openDetails &&
                    <div className={`flex flex-col justify-center items-center w-full h-full py-1`}>
                        <div className={`flex flex-row justify-between w-full items-center`}>
                            <button onClick={() => setShowIngredients(true)} className={`py-1 text-healthyGray1 text-sm sm:text-md rounded-t-xl text-center w-1/2 ${showIngredients ? 'bg-healthyGray/100 font-semibold' : 'bg-healthyGray/30'}`}>Ingredients</button>
                            <button onClick={() => setShowIngredients(false)} className={`py-1 text-healthyGray1 text-sm sm:text-md rounded-t-xl text-center w-1/2 ${showIngredients ? 'bg-healthyGray/30' : 'bg-healthyGray/100 font-semibold'}`}>Comments</button>
                        </div>
                        <div className={`flex flex-col items-between w-full rounded-b-xl bg-healthyGray h-full justify-between`}>
                            {showIngredients ? <Ingridients data={plate.ingredients} /> : <Comments data={plate.reviews[0]} setScores= {setScores} />}
                        </div>
                    </div>
                }
                <div className='w-full flex justify-between items-center flex-col sm:flex-row'>
                    <p onClick={() => setOpenDetails(!openDetails)} className='text-healthyDarkGray1 text-sm cursor-pointer text-right underline underline-offset-2 hover:text-healthyGray1'>{openDetails ? 'Close details' : 'View details'}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
