
import jwtDecode from 'jwt-decode';
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

export function clearCookies(name = "jwt") {
  // Check if the code is running on the client-side
  if (typeof window !== "undefined") {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export function isValidToken (accessToken: string | undefined)  {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);

  console.log({ decoded })
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
  };
