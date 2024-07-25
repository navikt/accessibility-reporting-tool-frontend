import type { APIRoute } from 'astro';
import { apiUrl } from '@src/urls.ts';

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL(apiUrl);
  const requestUrl = new URL(request.url.replace('/proxy', ''));
  return new URL(requestUrl.pathname, proxyUrl);
};

export const ALL: APIRoute = async ({ request }) => {
  const proxyUrl = getProxyUrl(request);
  let response;

  try {
    console.log('fetch-url: ' + proxyUrl);
    console.log('request :' + request);
    response = await fetch(proxyUrl.href, request);
    console.log('response status: ' + response);
    console.log('response: ' + (await response.json()));
  } catch (e) {
    console.log('error:     ' + e);
  }
  return response?.json();
};
