import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const adminCookie = request.cookies.get("admin_session");
    const isCookieAdmin = adminCookie && adminCookie.value === "authenticated";

    if (!isCookieAdmin) {
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
      if (token && token.email === "jamphy.admin@gmail.com") {
        const response = NextResponse.next();
        response.cookies.set("admin_session", "authenticated", { path: "/" });
        return response;
      }

      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
