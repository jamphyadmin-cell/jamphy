import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // On initial login, store DB fields in the token
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      // Support manual updates from client useSession().update()
      if (trigger === "update" && session) {
        if (session.name !== undefined) token.name = session.name;
        if (session.image !== undefined) token.picture = session.image;
        if (session.username !== undefined) token.username = session.username;
      } else {
        const userId = token.id || token.sub;
        if (userId && !token.username) {
          // Fallback: if username is missing in active token, query DB to see if they've completed it
          try {
            const dbUser = await prisma.user.findUnique({
              where: { id: userId },
              select: { username: true },
            });
            if (dbUser?.username) {
              token.username = dbUser.username;
            }
          } catch (err) {
            console.error("Database fallback session check failed:", err);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub || token.id;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
