// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from "./lib/utils/supabaseClient";

export async function middleware(req: NextRequest) {
  // Get the current user session
  const { data: { session } } = await supabase.auth.getSession();

  // If there's no session (i.e., not authenticated), redirect to login
  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Allow the request to proceed if the user is authenticated
  return NextResponse.next();
}

// Apply the middleware only to /dialogues/* routes
export const config = {
  matcher: ['/dialogues/*'],
};
