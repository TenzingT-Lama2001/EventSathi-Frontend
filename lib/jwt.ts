import jwtDecode from 'jwt-decode';
// export function getAccessTokenFromCookie(name = "jwt"): string | undefined {
//   // Check if the code is running on the client-side
//   if (typeof window !== "undefined") {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) {
//       const token = parts.pop()?.split(';').shift();
//       console.log("🚀 ~ file: jwt.ts:10 ~ getAccessTokenFromCookie ~ token:", token)
//       return token || undefined;
//     }
//   }
//   return undefined;
// }

export function getAccessTokenFromCookie(cookieName = 'jwt') {
  // Check if the code is running on the client-side
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
  }
  return undefined; // Return undefined if the cookie is not found
}

export function clearCookies(name = 'jwt') {
  // Check if the code is running on the client-side
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export function isValidToken(accessToken: string | undefined) {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
}

export function handleTokenExpired(exp: number) {
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');
    clearCookies();
    window.location.href = '/login';
  }, timeLeft);
}

export function setSession(accessToken: string | null) {
  if (accessToken) {
    // console.log('running set session');
    // This function below will handle when token is expired
    const { exp } = jwtDecode<{ exp: number }>(accessToken); // ~3 days by minimals server
    handleTokenExpired(exp);
  }
}
