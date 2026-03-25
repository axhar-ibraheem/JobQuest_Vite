export const API_BASE_URL =
  "https://jobsboard-e5259-default-rtdb.firebaseio.com";

export const JOBS_ENDPOINT = `${API_BASE_URL}/jobs_data.json`;

export const AUTH_ENDPOINT = (apiKey: string): string =>
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

export const AUTH_SIGNUP_ENDPOINT = (apiKey: string): string =>
  `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

export const API_UPDATE_PROFILE_ENDPOINT = (apiKey: string): string =>
  `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;

export const API_LOOKUP_PROFILE_ENDPOINT = (apiKey: string): string =>
  `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;
