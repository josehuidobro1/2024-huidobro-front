import React, { useState } from 'react'
import Comment from './Comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import MyComment from './MyComment'

const Comments = ({data,value, setValue}) => {
    const [myComments, setMyComments]=useState(value ? value.comments : [])
    const [comment, setComment]=useState('')
    const comments=(data.filter((item)=>item.idUser!==1))
    const handleNewComment=()=>{
        if(comment!==''){
        setMyComments(myComments.concat(comment))
        setValue({...value, comments: myComments})
        setComment('')}
    }
  return (
    <div className='flex flex-col justify-between items-between w-full h-full px-2 pt-1'>
        <div className='bg-white rounded-md p-1 flex flex-col w-full shadow-sm max-h-32  justify-start items-center h-full overflow-y-auto'>
            {comments.map((item, index)=>(item.comments.length > 0 && <Comment key={index} data={item} />))}
            {myComments && myComments.map((item, index)=>(<MyComment text={item} key={index}/>))}
        </div>
        <div className='flex justify-between items-center w-full sticky bottom-0 bg-white rounded-md my-2 shadow-sm'>
            <div className='flex items-center  justify-start p-1 w-10/12 md:w-11/12'>
                <input value={comment} onChange={(e)=> e.target.value.trim() !== '' && setComment(e.target.value)} className='w-full text-left text-healthyDarkGray1 px-2 py-1 font-semibold text-xs md:text-sm ring-0 ring-offset-0  ' type='text' placeholder='Leave your comment...'/>
            </div>
            <div onClick={handleNewComment} className='flex w-2/12 md:w-1/12 h-full justify-center items-center bg-healthyOrange hover:bg-healthyDarkOrange p-1 cursor-pointer rounded-r-md'><FontAwesomeIcon icon={faPaperPlane} className='text-white text-lg '/></div>
        </div>
    </div>
  )
}

export default Comments