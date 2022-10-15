import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ account, profile }) {
      console.log(account, profile);
      if (account.provider === "google") {
        return profile.email.endsWith("@utexas.edu")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  secret: process.env.NEXT_AUTH_SECRET as string,
};

export default NextAuth(authOptions);
