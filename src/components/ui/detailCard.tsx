import React from 'react'

interface detailCardProps{
    title: string;
    text: string;
}

const detailCard
 = ({title, text}: detailCardProps) => {
  return (
    <div className=''>
        <h3 className='normal-case font-base'>{title}</h3>
        <p className="text-sm">{text}</p>
    </div>
  )
}

export default detailCard
