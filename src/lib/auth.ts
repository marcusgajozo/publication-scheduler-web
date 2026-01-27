import { PUBLICATION_SCHEDULER_API_URL, JWT_SECRET } from "@/constants/env";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

type CustomUser = {
  id: string;
  email: string;
  name: string;
  accessToken: string;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: JWT_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${PUBLICATION_SCHEDULER_API_URL}/sign-in`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            return null;
          }

          const data = await res.json();

          const decoded = jwtDecode<{
            sub: string;
            email: string;
            name: string;
          }>(data.accessToken);

          return {
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            accessToken: data.accessToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = (user as CustomUser).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
