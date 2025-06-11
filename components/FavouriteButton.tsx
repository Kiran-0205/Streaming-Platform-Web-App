import React, { useCallback, useMemo } from 'react'
import axios from 'axios'
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavourites from '@/hooks/useFavourites'
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai'


interface FavouriteButtonProps {
    movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({movieId}) => {
    const { mutate: mutateFavourites } = useFavourites();
    const { data: currentuser, mutate} = useCurrentUser();

    const isFavourite = useMemo (() => {
        const list = currentuser?.favouriteIds || [];

        return list.includes(movieId);
    }, [currentuser, movieId]);

    const toggleFavourites = useCallback(async () => {
        let response;
        if(isFavourite){
            response = await axios.delete('/api/favourite', {
                data: { movieId }
            })
        } else {
            response = await axios.post('/api/favourite', {movieId} );
      
        }
        const updatedFavouriteIds = response?.data?.favouriteIds;

        mutate({
            ...currentuser,
            favouriteIds: updatedFavouriteIds
        })

        mutateFavourites();
    }, [movieId, isFavourite, currentuser, mutate, mutateFavourites]);

    const Icon = isFavourite ?  AiOutlineCheck : AiOutlinePlus;

  return (
    <div onClick={toggleFavourites} className='cursor-pointer group/item
    w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center
    items-center transition hover:border-neutral-100'>
        <Icon className='text-white' size={25}/>
    </div>
  )
}

export default FavouriteButton