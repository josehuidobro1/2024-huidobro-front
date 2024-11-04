import React, { useState } from 'react'
import Comment from './Comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import MyComment from './MyComment'
import { Rating } from '@mui/material'
import { auth } from "../../../firebaseConfig";
import {updateComments} from "../../../firebaseService"

const Comments = ({ data, setScores }) => {
    const [myComments, setMyComments] = useState(data.comments.filter((item) => item.id_User === auth.currentUser?.uid));
    const [comment, setComment] = useState('');
    const [score, setScore] = useState(null);
    const comments = data.comments.filter((item) => item.id_User !== auth.currentUser?.uid);
    const [allComments, setAllComments] = useState(data.comments)
    

    const handleNewComment = async () => {
        if (comment !== '' && score) {
            const newComment = {
                comment: comment,
                score: score,
                id_User: auth.currentUser?.uid,
            };
    
            const updatedAllComments = [...allComments, newComment];
            setAllComments(updatedAllComments);
            setMyComments([...myComments, newComment]);
            
            // Calculate the average score
            const totalScore = updatedAllComments.reduce((acc, curr) => acc + curr.score, 0);
            const averageScore = (totalScore / updatedAllComments.length).toFixed(1);
            
            setScores(averageScore);
    
            // Update the comment and score data in Firebase
            const updatedInfo = {
                plate_Id: data.plate_Id,
                comments: updatedAllComments,
                score: parseFloat(averageScore)
            };
            
            try {
                await updateComments(data.id, updatedInfo);
                console.log("Comments updated successfully.");
            } catch (error) {
                console.error("Failed to update comments:", error);
            }
    
            // Reset input fields
            setComment('');
            setScore(null); // Reset score after submitting
        }
    };
    

    return (
        <div className='flex flex-col justify-between items-between w-full h-full px-2 pt-1'>
            <div className='bg-white rounded-md p-1 flex flex-col w-full shadow-sm max-h-32 justify-start items-center h-full overflow-y-auto'>
                {comments.map((item, index) => (
                    <Comment key={index} data={item} />
                ))}
                {myComments.map((item, index) => (
                    <MyComment data={item} key={index} />
                ))}
            </div>
            <div className='flex justify-between items-center w-full sticky bottom-0 bg-white rounded-md my-2 shadow-sm'>
                
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className='w-full text-left text-healthyDarkGray1 px-2 py-1 font-semibold text-xs md:text-sm ring-0 ring-offset-0'
                    type='text'
                    placeholder='Leave your comment...'
                />
                <div className='flex items-center justify-center mx-2'>
                    <Rating 
                        value={score} 
                        onChange={(e, newScore) => setScore(newScore)} 
                        sx={{ '& .MuiRating-icon': { marginX: '-2px' } }} // Adjust margin between stars
                    />

                </div>
                <div onClick={handleNewComment} className='flex w-2/12 md:w-1/12 h-full justify-center items-center bg-healthyOrange hover:bg-healthyDarkOrange p-1 cursor-pointer rounded-r-md'>
                    <FontAwesomeIcon icon={faPaperPlane} className='text-white text-lg' />
                </div>
            </div>
        </div>
    );
}

export default Comments;

