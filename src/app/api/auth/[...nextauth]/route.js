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
    async session({ session, token }) {
      // Add the user id to the session for convenience
      if (session.user && token.sub) {
        session.user.id = token.sub;

        // Fetch latest user data from database so session is always up-to-date
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { name: true, image: true, username: true }
          });
          
          if (dbUser) {
            session.user.name = dbUser.name;
            session.user.image = dbUser.image;
            session.user.username = dbUser.username;
          }
        } catch (error) {
          console.error("Error fetching user session data:", error);
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
