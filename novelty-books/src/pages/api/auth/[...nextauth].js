import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";
dotenv.config();


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
      callbackUrl: "https://novelty-books.vercel.app/api/auth/callback/google",
      // callbackUrl: "https://localhost:3000/api/auth/callback/google",
    }),
  ],
};

export default NextAuth(authOptions);
