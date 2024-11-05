import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import noPlateImage from '../../../assets/noPlateImage.jpg'
import Comments from './Comments'
import Ingridients from './Ingridients'
import { auth } from "../../../firebaseConfig";

const Card = ({ plate }) => {
    const [openDetails, setOpenDetails] = useState(false)
    const [showIngredients, setShowIngredients] = useState(true)
    const [scores, setScores] = useState(plate.reviews[0].score)
    const comments = plate.reviews.map((item) => item.comments)

    return (
        <div className={`rounded-xl bg-white shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 m-2 ${openDetails ? 'pb-4' : 'h-64'}`}>
            <div className="w-full h-40">
                <img 
                    src={plate.image || noPlateImage} 
                    alt={plate.name} 
                    className="w-full h-full object-cover rounded-t-xl" 
                />
            </div>
            <div className="px-4 py-2">
                <div className="flex justify-between items-center">
                    <h1 className="text-md font-semibold text-healthyDarkGray1">{plate.name}</h1>
                    <div className="flex items-center text-healthyYellow">
                        <p className="font-bold pr-1">{scores}</p>
                        <FontAwesomeIcon icon={faStar} className="text-healthyYellow" />
                    </div>
                </div>
                {!openDetails && (
                    <p className="text-xs text-healthyGray1">
                        {comments[0].length > 0 ? `${comments[0].length} comments` : 'No comments yet'}
                    </p>
                )}
            </div>
            {openDetails && (
                <div className="px-4 py-2">
                    <div className="flex justify-center">
                        <button 
                            onClick={() => setShowIngredients(true)} 
                            className={`w-1/2 py-1 ${showIngredients ? 'font-semibold bg-healthyGray' : 'bg-healthyGray/30'}`}>
                            Ingredients
                        </button>
                        <button 
                            onClick={() => setShowIngredients(false)} 
                            className={`w-1/2 py-1 ${!showIngredients ? 'font-semibold bg-healthyGray' : 'bg-healthyGray/30'}`}>
                            Comments
                        </button>
                    </div>
                    <div className="bg-healthyGray p-2 mt-2 rounded-b-xl">
                        {showIngredients ? (
                            <Ingridients data={plate.ingredients} />
                        ) : (
                            <Comments data={plate.reviews[0]} setScores={setScores} />
                        )}
                    </div>
                </div>
            )}
            <div className="px-4 py-2 text-center">
                <p 
                    onClick={() => setOpenDetails(!openDetails)} 
                    className="text-healthyDarkGray1 text-sm cursor-pointer underline hover:text-healthyGray1">
                    {openDetails ? 'Close details' : 'View details'}
                </p>
            </div>
        </div>
    )
}

export default Card

