/* eslint-disable no-unused-vars */
const modulename = "browserStorage # ";
const Version = "Sessions.js Jun 10 2026, 1.00";

// ------------------------------------------------------------------------
export async function createLocalData(key, value) {
  localStorage.setItem(key, value);
}
// ------------------------------------------------------------------------
export async function deleteLocalData(key) {
  localStorage.removeItem(key);
}
// ------------------------------------------------------------------------
export async function getLocalData(key) {
  return localStorage.getItem(key);
}
// ------------------------------------------------------------------------
export async function createSessionData(key, value, options = {}) {
  sessionStorage.setItem(key, value);
}
// ------------------------------------------------------------------------
export async function deleteSessionData(key) {
  sessionStorage.removeItem(key);
}
// ------------------------------------------------------------------------
export async function getSessionData(key) {
  return sessionStorage.getItem(key);
}
