import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";
dotenv.config();


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "275120189754-6rb7h8aqnd58c20ung7g99su7dj7igcc.apps.googleusercontent.com",
      clientSecret: "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",
      callbackUrl: "https://novelty-books.vercel.app/api/auth/callback/google",
      // callbackUrl: "https://localhost:3000/api/auth/callback/google",
    }),
  ],
};

export default NextAuth(authOptions);
