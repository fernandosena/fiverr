export const HOST = process.env.SERVER_URL;
export const API_URL = `${HOST}/api`;

export const AUTH_ROUTER = `${API_URL}/auth`;

export const SIGNUP_ROUTE = `${AUTH_ROUTER}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTER}/login`;
export const GET_USER_INFO = `${AUTH_ROUTER}/get-user-info`;
export const SET_USER_INFO = `${AUTH_ROUTER}/set-user-info`;
export const SET_USER_IMAGE = `${AUTH_ROUTER}/set-user-image`;
