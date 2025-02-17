import React from 'react'

const Map = () => {
  return (
    <div>
        <iframe className='w-screen h-[300px]'
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8383122649007!2d36.804639374115354!3d-1.2699446356066908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17391278e4eb%3A0x7c9e281821e3263!2sThe%20Mirage!5e0!3m2!1sen!2ske!4v1729674282057!5m2!1sen!2ske"
allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Google Maps showing The Mirage location"
></iframe>

    </div>
  )
}

export default Map