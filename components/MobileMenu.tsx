import React from 'react';

interface MobileMenuProps {
    visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({visible}) => {
    if(!visible){
        return null;
    }

  return (
    <div className='bg-black w-52 absolute top-8 left-0 py-5 flex flex-col
    border-2 border-gray-800 gap-1'>
        <div className='text-center text-white hover:underline'>
            Home
        </div>
        <div className='text-center text-white hover:underline'>
            Series
        </div>
        <div className='text-center text-white hover:underline'>
            Films
        </div>
        <div className='text-center text-white hover:underline'>
            New & Popular
        </div>
        <div className='text-center text-white hover:underline'>
            My List
        </div>
        <div className='text-center text-white hover:underline'>
            Browse by Languages
        </div>

        
    </div>
  )
}

export default MobileMenu