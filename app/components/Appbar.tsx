"use client";

import { signIn, signOut, useSession } from "next-auth/react"
import { PrimaryButton } from "./Button";

export const Appbar = () => {
    const session = useSession();
    return <div className="border-b px-2 py-2 flex justify-between">
        <div className="text-3xl font-bold flex justify-center">
            DCEX
        </div>
        <div>
            {session.data?.user? <PrimaryButton onClick={() => {
                signOut()
            }}> 
            Logout 
            </PrimaryButton> :<PrimaryButton onClick={() => {
                signIn()
            }}> 
            SignIn 
            </PrimaryButton> }
        </div>
    </div>
}