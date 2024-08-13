import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import db from '@/app/db';
import { Keypair } from "@solana/web3.js";
import { Provider } from "@prisma/client";


// signUp -> Sign in with google
const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    callbacks: {
      async signIn({user, account, profile, email, credentials}) {
        if(account?.provider === "google" ){

          const email = user.email;
          if(!email){
            return false
          }

          const userDb = await db.user.findFirst({
            where: {
              username: email
            }
          })

          if(userDb){
            return true
          }

          const keypair = Keypair.generate();
          const publicKey = keypair.publicKey.toBase58();
          const privateKey = keypair.secretKey;
          console.log(publicKey);
          console.log(privateKey);

          await db.user.create({
            data: {
              username: email,
              provider: "Google",
              solWallet: {
                create: {
                  publicKey: publicKey,
                  privatKey: privateKey.toString()
                }
              },
              InrWallet:{
                create: {
                  balance: 0
                }
              }
            }
          })

          return true

        }

        return false
      }
    }
    
})

export { handler as GET, handler as POST }



/*

callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    if(account?.provoder === "google"){
      const email = user.email;
      if(!email){
        return false
      }
      // is there a user with a specific details
      const userDb = await db.user.findFirst({
        where: {
            username: email
        }
      })

      // if there is it is fine the user already have a private key
      if(userDb){
        return true;
      }

      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toBase58();
      const privateKey = keypair.secretKey;
      console.log(publicKey);
      console.log(privateKey);

      // else we need to store this user in our dataase 
      await db.user.create({
        data: {
          username: email,
          provider: "Google",
          solWallet: {
            create: {
              publicKey: publicKey,
              privatKey: privateKey.toString()
            }
          },
          InrWallet: {
            create: {
              balance: 0
            }
          }

        }
      })
      
    }
    return true
  },
}

*/