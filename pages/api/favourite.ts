// import { NextApiRequest, NextApiResponse } from "next";
// import { without } from "lodash";

// import prismadb from '@/lib/prismadb';
// import serverAuth from "@/lib/serverAuth";



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   


    
//     try {
//          console.log("fdfs");
//         if(req.method === 'POST'){
//             const { currentUser } = await serverAuth(req);
          
//             const { movieId } = req.body;
            
//             const existingMovie = await prismadb.movie.findUnique({
//                 where: {
//                     id: movieId,
//                 }
//             })

//             if(!existingMovie){
//                 throw new Error('Invalid ID');
//             }

//             const user = await prismadb.user.update({
//                 where: {
//                     email: currentUser.email || '',
//                 },
//                 data: {
//                     favouriteIds: {
//                         push: movieId,
//                     }
//                 }

//             })

//             return res.status(200).json(user);
//         }

//         if(req.method === 'DELETE'){
//             const { currentUser } = await serverAuth(req);
//             const { movieId } = req.body;
//             const existingMovie = await prismadb.movie.findUnique({
//                 where: {
//                     id: movieId
//                 }
//             })
//             if(!existingMovie){
//                 throw new Error('Invalid ID');
//             }
//             const updatedFavouriteIds = without(currentUser.favouriteIds, movieId);
//             const updatedUser = await prismadb.user.update({
//                 where: {
//                     email: currentUser.email || '',
//                 },
//                 data: {
//                     favouriteIds: updatedFavouriteIds,
//                 }
//             })
//             return res.status(200).json(updatedUser);
//         }

//         return res.status(405).end();
//     } catch (err){
//         console.log(err);
//         return res.status(400).end();
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API HIT: /api/favourite", req.method);

    try {
        const { currentUser } = await serverAuth(req);
        console.log("Authenticated user:", currentUser);

        if (!currentUser?.email) {
            console.error("Missing user email");
            return res.status(401).json({ error: 'Unauthorized: Email missing' });
        }

        const { movieId } = req.body;
        console.log("Movie ID:", movieId);

        if (!movieId || typeof movieId !== 'string') {
            console.error("Invalid movieId type or missing");
            return res.status(400).json({ error: 'Invalid movieId' });
        }

        const existingMovie = await prismadb.movie.findUnique({
            where: { id: movieId }
        });

        if (!existingMovie) {
            console.error("Movie not found in DB:", movieId);
            return res.status(404).json({ error: 'Movie not found' });
        }

        if (req.method === 'POST') {
            const user = await prismadb.user.update({
                where: { email: currentUser.email },
                data: {
                    favouriteIds: { push: movieId }
                }
            });

            console.log("Movie added to favourites:", user.favouriteIds);
            return res.status(200).json(user);
        }

        if (req.method === 'DELETE') {
            const updatedFavouriteIds = without(currentUser.favouriteIds, movieId);

            const updatedUser = await prismadb.user.update({
                where: { email: currentUser.email },
                data: {
                    favouriteIds: updatedFavouriteIds
                }
            });

            console.log("Movie removed from favourites:", updatedFavouriteIds);
            return res.status(200).json(updatedUser);
        }

        console.error("Unsupported method");
        return res.status(405).json({ error: 'Method not allowed' });

    } catch (err: any) {
        console.error("Unhandled error in /api/favourite:", err);
        return res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}
