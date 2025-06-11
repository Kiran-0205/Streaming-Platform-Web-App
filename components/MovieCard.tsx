import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import FavouriteButton from './FavouriteButton';
import { useRouter } from 'next/router';


interface MovieCardProps {
    data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    const router = useRouter();

  return (
     <div className='group bg-zinc-900 col-span relative h-[12vw]'>
        <img src={data.thumbnailUrl} alt="Movie"  className='cursor-pointer object-cover transition duration-300
        shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0
        delay-150 w-full h-[12vw]' />
        <div className='absolute top-0 transition duration-200 z-40 w-full opacity-0 invisible sm:visible delay-300 scale-0
        group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100'>
            <img src={data.thumbnailUrl} alt="Movie" 
            className='cursor-pointer object-cover transition 
            duration-300 shadow-xl rounded-t-md w-full h-[12vw]'/>
            <div className=' z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md '>
                <div className='flex flex-row items-center gap-3'>
                    <div onClick={() => router.push(`/watch/${data?.id}`)} className='bg-white w-6 h-6 lg:w-10 lg:h-10 rounded-full cursor-pointer flex justify-center items-center transition hover:bg-neutral-300'>
                        <PlayIcon  className='text-black w-4 lg:w-7'/>
                    </div>
                    <FavouriteButton movieId={data?.id} />
                    <div className='cursor-pointer w-6 h-6 ml-auto group/item lg:w-9 lg:h-9 border-2 border-white rounded-full
                    flex justify-center items-center transition hover:border-neutral-300'>
                        <ChevronDownIcon  className='text-white group-hover/item:text-neutral-300 w-4 lg:w-6'/>
                    </div>
                </div>
                <p className='text-green-400 font-semibold mt-4'>
                    New  <span className='text-white'>2025</span>
                </p>
                <div className='flex flex-row items-center mt-2 gap-2'    > 
                    <p className='text-white text-[10px] lg:text-sm' >{data.duration} | {data.genre}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard