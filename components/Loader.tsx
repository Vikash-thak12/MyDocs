import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='loader'>
        <Image
        src="/assets/icons/loader.svg"
        alt='loader'
        height={42}
        width={42}
        className='animate-spin'
         />
         <p className='text-3xl'>Loading...</p>
    </div>
  )
}

export default Loader
