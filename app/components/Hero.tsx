"use client";

import { sign } from "crypto"
import { SecondaryButton } from "./Button"
import { signIn, useSession } from "next-auth/react"
import { useReducer } from "react";
import { useRouter } from "next/navigation";



export const Hero = () => {
    const session = useSession();
    const router = useRouter();

    return <div>
        <div className="text-6xl font-medium">
            <span>
                The indian Crypocurrency 
            </span>
            <span className="text-sky-500 pl-2">
                Revolution.
            </span>
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Create a frictionless Indian wallet with just a Google Account.
        </div>
        <div className="pt-4 flex justify-center">
            {session.data?.user?  <SecondaryButton onClick={() => {
                router.push("/dashboard");
            }}> Go to Dashboard </SecondaryButton> : <SecondaryButton onClick={() => {
                signIn("google");
            }}> Login With Google </SecondaryButton>}
        </div>
    </div>
}