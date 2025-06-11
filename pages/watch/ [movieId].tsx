'use client'
import React from 'react'
import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/router'
import { AiOutlineArrowLeft } from 'react-icons/ai';


const Watch = () => {
  console.log("reached");
    const router = useRouter();
    const { movieId } = router.query;

    const { data } = useMovie(movieId as string); 

  return (
    <div className='h-screen w-screen bg-black '>
      <nav className='fixed w-full popacity-70 flex flex-row items-center z-10 p-4 w-gap-8 '>
        <AiOutlineArrowLeft /> 
      </nav>
      <video autoPlay controls src={data?.videoUrl} />
    </div>
  )
}

export default Watch