import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

// Routes that should be public (auth pages)
const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)'
]);

export default clerkMiddleware((auth, req) => {
  // Only protect routes that are explicitly marked as protected
  // and are not public routes
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
