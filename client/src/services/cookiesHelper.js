/* eslint-disable no-unused-vars */
const modulename = "CookiesHelper # ";
const Version = "Sessions.js Jun 10 2026, 1.10";
const CookieExpirationDelay = 1 * 24 * 60 * 60; // One day expiration date for Cookie (sec)
// ------------------------------------------------------------------------
//       httpOnly: true, // No JS access
//       secure: process.env.NODE_ENV === "production", // If prod, use HTTP for requests
//       path: '/', // Use cookie for all APP pages. Could be restrained to sensitive pages
//       maxAge: CookieExpirationDelay,   // One day persistence
//       sameSite: "Lax" // To block CSRF attacks. Cookie is sent only to our site. Look at https://contentsquare.com/fr-fr/blog/samesite-cookie-attribute/
// ------------------------------------------------------------------------
export async function createCookie(cookiename, cookievalue) {
  
  document.cookie = `${cookiename}=${cookievalue}; max-age=${CookieExpirationDelay}; path=/; SameSite=Lax;`;
  }
// ------------------------------------------------------------------------
export async function deleteCookie(cookiename) {
  document.cookie = `${cookiename}=; max-age=0; path=/; SameSite=lax; `;  
}
// ------------------------------------------------------------------------
export async function getCookie(cookiename) {
  const name = `${cookiename}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  
  