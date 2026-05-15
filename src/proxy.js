import { NextResponse } from "next/server";

export function proxy(request) {
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const adminCookie = request.cookies.get("admin_session");

    // Check if the cookie exists and equals the expected value
    if (!adminCookie || adminCookie.value !== "authenticated") {
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
