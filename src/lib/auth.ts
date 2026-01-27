import { AUTH_SECRET } from "@/constants/env";
import { post } from "@/util/methods-client-http";
import { jwtDecode } from "jwt-decode";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

type User = {
  id: string;
  email: string;
  is_admin: boolean;
  access_token: string;
};

type JwtDecode = Omit<User, "access_token"> & { sub: string };

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const res = await post<{ token: string }>("/sign-in", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.status !== 200) {
            return null;
          }

          const data = res.data;

          const decoded = jwtDecode<JwtDecode>(data.token);

          return {
            id: decoded.sub,
            email: decoded.email,
            is_admin: decoded.is_admin,
            access_token: data.token,
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
        token.access_token = user.access_token;
        token.is_admin = user.is_admin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.is_admin = token.is_admin;
        session.user.access_token = token.access_token;
      }
      return session;
    },
  },
});
