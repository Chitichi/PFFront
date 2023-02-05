import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";
dotenv.config();


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_CONFIG_GOOGLE_ID,
      clientSecret: process.env.NEXT_CONFIG_GOOGLE_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
