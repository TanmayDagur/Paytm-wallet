import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Missing phone or password");
        }
        

        const user = await db.user.findUnique({
          where: { number: credentials.phone },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        
        return {
          id: user.id.toString(),
          name: user.name ?? null,
          number: user.number,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",   
    signOut: "/signout", 
  },

  secret: process.env.JWT_SECRET || "secret",

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.number = token.number as string; 
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.number = (user as any).number;
      }
      return token;
    },
  },
};
