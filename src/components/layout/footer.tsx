import React from 'react'

const footer = () => {
  return (
    <footer className='bg-[#020c12] p-6 mt-6'>
        <div className='responsive flex flex-col items-center justify-between'>
            <div className='flex flex-col items-center space-y-4'>
            <h1 className='text-white text-2xl'>Wellness Dialogues</h1>
            <p className='text-white text-sm'>© 2023 Wellness Dialogues. All rights reserved.</p>
            </div>
            <div className='flex space-x-4'>
            <a href='#' className='text-white text-sm'>Privacy Policy</a>
            <a href='#' className='text-white text-sm'>Terms of Service</a>
            </div>
        </div>
    </footer>
  )
}

export default footer