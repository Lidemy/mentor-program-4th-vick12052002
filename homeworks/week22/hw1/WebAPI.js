import { getAuthToken } from './utils';
const BASE_URL = ' https://student-json-api.lidemy.me';
export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getPosts = (limit, page) => {
  let CURRENT_URL = `${BASE_URL}/posts?_sort=id&_order=desc`;
  if (limit) {
    CURRENT_URL += `?_limit=${limit}`;
  }
  if (page) {
    CURRENT_URL += `?_page=${page}`;
  }
  if (page && limit) {
    CURRENT_URL = `${BASE_URL}/posts?_page=${page}&_limit=${limit}`;
  }
  console.log(CURRENT_URL);
  return fetch(CURRENT_URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};

export const getPost = (id) => {
  const CURRENT_URL = `${BASE_URL}/posts/${id}`;
  return fetch(CURRENT_URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};

export const addPost = (title, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body: content,
    }),
  }).then((res) => res.json());
};
