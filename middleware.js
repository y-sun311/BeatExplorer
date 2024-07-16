import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
    secureCookie: true

  });

  const { pathname } = request.nextUrl;

  // Allow the request if the following is true
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Allow requests for static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Redirect to login if no token is present
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}


