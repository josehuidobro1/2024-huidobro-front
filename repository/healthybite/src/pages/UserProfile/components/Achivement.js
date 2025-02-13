
import award from '../../../assets/award.png'
import noAward from '../../../assets/noAward.png'
import React from 'react'

const Achivement = ({complete, name, description, subtitle}) => {
  return (
    <div className={`flex flex-col py-5 px-3 ${complete ? 'bg-healthyDarkYellow/20': 'bg-healthyGray1/20'} rounded-lg shadow-sm  w-full font-quicksand text-center h-full items-center justify-center`}>
        <img src={complete ? award : noAward} className={` w-2/5`}/>
        <h3 className="font-bold text-sm text-healthyDarkGray1 pt-4 w-11/12 border-1 border-b-healthyGray1">{name}</h3>
        {subtitle  && <p className='text-xs  mt-1 text-healthyDarkGray1'>{subtitle}</p>}
        {description && <p className="text-xs text-healthyDarkGray1/90 pt-2">{description}</p>}
    </div>
  )
}

export default Achivement