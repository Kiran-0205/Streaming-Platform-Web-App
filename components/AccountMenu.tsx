import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react"

interface AccountMenuProps {
    visible?: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({visible}) => {
    const { data: currentUser } = useCurrentUser();

    if(!visible) {
        return null;
    }

    return (
        <div className="bg-black absolute top-14 right-0 w-56 py-5 flex flex-col border-2 border-gray-800 cursor-default">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/i flex flex-row gap-3 items-center w-full">
                    <img className="w-6 h-6 group-hover/i:cursor-pointer" src='/images/default-red.png' alt="logo"/>
                    <p className="text-white text-sm group-hover/i:underline group-hover/i:cursor-pointer">{currentUser?.name}</p>
                </div>
            </div>
            <hr className="bg-gray-600 border-0 h-px my-4"/>
            <div onClick={() => { signOut() }} className="text-white text-sm hover:underline cursor-pointer text-center"> 
                Sign out of Netflix
            </div>
        </div>

    )
}

export default AccountMenu