import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user, trigger, session }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.username = user.username;
        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      }

      // Support manual updates from client useSession().update()
      if (trigger === "update" && session) {
        if (session.name !== undefined) token.name = session.name;
        if (session.image !== undefined) token.picture = session.image;
        if (session.username !== undefined) token.username = session.username;
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (token.expires_at && Date.now() < token.expires_at * 1000) {
        const userId = token.id || token.sub;
        if (userId && !token.username) {
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
        return token;
      }

      // Access token has expired, try to update it
      try {
        if (!token.refresh_token) {
          throw new Error("No refresh token available");
        }
        
        const response = await fetch("https://oauth2.googleapis.com/token", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID || "",
            client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
          method: "POST",
        });

        const tokens = await response.json();

        if (!response.ok) throw tokens;

        token.access_token = tokens.access_token;
        token.expires_at = Math.floor(Date.now() / 1000 + tokens.expires_in);
        token.refresh_token = tokens.refresh_token ?? token.refresh_token; // Fall back to old refresh token
      } catch (error) {
        console.error("Error refreshing access token", error);
        token.error = "RefreshAccessTokenError";
      }

      const userId = token.id || token.sub;
      if (userId && !token.username) {
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

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub || token.id;
        session.error = token.error;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.username = token.username;

        // Fetch latest user data from database so session is always up-to-date
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { name: true, image: true, username: true }
          });
          
          if (dbUser) {
            session.user.name = dbUser.name;
            session.user.image = dbUser.image;
            session.user.username = dbUser.username;
          }
        } catch (error) {
          console.error("Error fetching latest user session info:", error);
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
