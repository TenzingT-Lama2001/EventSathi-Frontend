"use client"
export function getAccessTokenFromCookie(name = "jwt"): string | undefined {
  // Check if the code is running on the client-side
  if (typeof window !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const token = parts.pop()?.split(';').shift();
      return token || undefined;
    }
  }
  return undefined;
}
