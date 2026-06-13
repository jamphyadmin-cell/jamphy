# Vercel Deployment Checklist

This document outlines the necessary steps to ensure the IIT JAM Physics Hub works flawlessly when deployed to Vercel and is accessed by users across different devices.

## 1. Vercel Environment Variables Configuration

When you push your code to Vercel, you must manually add the following Environment Variables in your Vercel project dashboard (`Settings > Environment Variables`):

- **`DATABASE_URL`**: Your Supabase or PostgreSQL connection string. (Same as your local `.env`).
- **`GOOGLE_CLIENT_ID`**: Your Google OAuth Client ID.
- **`GOOGLE_CLIENT_SECRET`**: Your Google OAuth Client Secret.
- **`GEMINI_API_KEY`**: Your Gemini AI key for the PDF extraction pipeline.
- **`NEXTAUTH_SECRET`**: A random secure string used to encrypt session tokens. You can generate one by running `openssl rand -base64 32` in your terminal.
- **`NEXTAUTH_URL`**: Your production Vercel URL (e.g., `https://jam-physics-hub.vercel.app`). This is critical, otherwise NextAuth will fail to redirect properly in production!

## 2. Google OAuth Authorized Redirect URIs

When you deploy to Vercel, Google will block logins unless you explicitly tell it that your Vercel domain is a trusted origin. 

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services > Credentials**.
3. Edit your OAuth 2.0 Client ID.
4. Under **Authorized redirect URIs**, add your Vercel production callback URL. It should look exactly like this:
   `https://[YOUR_VERCEL_DOMAIN].vercel.app/api/auth/callback/google`
5. Save your changes.

## 3. Database Sync & Next.js Build

The `package.json` file is already configured with `"postinstall": "prisma generate"`. This ensures that Vercel automatically downloads the correct Prisma Client binaries for their serverless environment during the build phase.

If you make any new changes to the database schema (`schema.prisma`), remember to run `npx prisma db push` locally to update your remote Supabase database *before* users hit the new Vercel deployment.

## 4. Mobile Responsiveness

The user interfaces (specifically `TestInterface.js`, `UserTable.js`, and `Leaderboard.js`) have been updated with robust responsive CSS classes.
- The **TestInterface** now gracefully stacks the Question Palette to the bottom on mobile devices (`iPhone` / `Android`).
- The **Save & Next** buttons have been made sticky so they are always visible without requiring extensive scrolling.
- Horizontal tables have been wrapped in `overflow-x-auto` to allow sideways swiping without breaking the screen layout.
