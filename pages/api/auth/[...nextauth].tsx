import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { FirestoreAdapter } from "@auth/firebase-adapter"
import admin from '@/lib/admin';
export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
          .then(userCredential => {
            if (userCredential.user) {
              if(userCredential.user.emailVerified==false)
             { console.log("not verified")
              return null;
              
              }

              return userCredential.user;
            }
            return null;
          })
          .catch(error => (console.log(error)))
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID|| "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET|| "",
    })

  ],


}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export default NextAuth(authOptions)
