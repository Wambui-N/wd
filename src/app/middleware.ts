// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/utils/supabaseClient";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token");
  const { data: user } = await supabase.auth.getUser(token?.value);

  if (!user && req.nextUrl.pathname.startsWith("/dialogues")) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dialogues/:path*"],
};
