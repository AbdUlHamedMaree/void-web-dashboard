import { isNil } from '$modules/checks';
import axios, { AxiosRequestConfig } from 'axios';
import { storage } from './storage';

const replaceAllQueryParams = (
  url: AxiosRequestConfig['url'],
  query: AxiosRequestConfig['query']
) =>
  url && query
    ? Object.entries(query).reduce(
        (a, [k, v]) =>
          !isNil(v) ? a.replaceAll(`/:${k}`, `/${encodeURIComponent(v)}`) : a,
        url
      )
    : url;

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 60000,
});

request.interceptors.request.use(
  config => {
    const lang = storage.language.get() ?? 'en';
    config.headers?.common?.set('Accept-Language', lang);
    config.url = replaceAllQueryParams(config.url, config.query);
    return config;
  },
  err => Promise.reject(err)
);

export { request };
