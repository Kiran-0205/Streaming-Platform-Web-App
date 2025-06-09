import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({ req });
     
    if(!session?.user?.email) {
        throw new Error("User session not found. Please log in.");
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session?.user?.email,
        }
    })

    if(!currentUser) {
        throw new Error("Account does not exist.");
    }

    return { currentUser };
}

export default serverAuth;