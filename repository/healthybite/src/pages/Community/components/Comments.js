import React, { useState } from 'react'
import Comment from './Comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import MyComment from './MyComment'

const Comments = ({data}) => {
    const [myComments, setMyComments]=useState([])
    const [comment, setComment]=useState('')

    const handleNewComment=()=>{
        setMyComments(myComments.concat(comment))
        setComment('')
    }
  return (
    <div className='flex flex-col justify-between items-between w-full h-full px-2 pt-1'>
        <div className='bg-white rounded-md p-1 flex flex-col w-full shadow-sm max-h-32  justify-start items-center h-full overflow-y-auto'>
            {data.map((item, index)=>(<Comment key={index} text={item} />))}
            {myComments.length>0 && myComments.map((item, index)=>(<MyComment text={item} key={index}/>))}
        </div>
        <div className='flex justify-between items-center w-full sticky bottom-0 bg-white rounded-md my-2 shadow-sm'>
            <div className='flex items-center  justify-start p-1 w-11/12'>
                <input value={comment} onChange={(e)=>setComment(e.target.value)} className='w-full text-left text-healthyDarkGray1 px-2 py-1 font-semibold text-sm ring-0 ring-offset-0  ' type='text' placeholder='Leave your comment...'/>
            </div>
            <div onClick={handleNewComment} className='flex w-1/12 h-full justify-center items-center bg-healthyOrange hover:bg-healthyDarkOrange p-1 cursor-pointer rounded-r-md'><FontAwesomeIcon icon={faPaperPlane} className='text-white text-lg '/></div>
        </div>
    </div>
  )
}

export default Comments