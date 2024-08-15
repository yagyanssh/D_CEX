"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./Button";
import { useEffect } from "react";
import { useState } from "react";



export const ProfileCard = ({ publicKey }: {
    publicKey: string
}) => {
    const session = useSession();
    const router = useRouter();

    if (session.status === "loading") {
        // TODO: replace with a skeleton
        return <div>
            Loading...
        </div>
    }

    if (!session.data?.user) {
        router.push("/")
        return <div></div>

    }

    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            <Greeting
                image={session.data?.user?.image ?? ""}
                name={session.data?.user?.name ?? ""}
            />
            <Assests publicKey={publicKey} />
        </div>
    </div>
}

// this component will render user name and image
function Greeting({
    image, name
}: {
    image: string, name: string
}) {
    return <div className="flex">
        <img src={image} className="rounded-full w-16 h-16 mr-4" />
        <div className="text-3xl font-semibold flex flec-col justify-center">
            Welcome back, {name}
        </div>
    </div>
}

// this component will render the users assests
function Assests({ publicKey }: {
    publicKey: string
}) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if(copied){
            let timeout = setTimeout(() => {
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [copied])

    return <div className="text-slate-500 mt-4">
        Account Assests
        <br />

        <div className="flex justify-between">
            <div>

            </div>
            <div>
                <PrimaryButton onClick={() => {
                    navigator.clipboard.writeText(publicKey)
                    setCopied(true)
                }}>{copied ? "Copied" : "Your wallet address"}</PrimaryButton>
            </div>

        </div>
    </div>
}