import type { APIRoute } from 'astro';
import { apiUrl } from '@src/urls.ts';

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL(apiUrl);
  const requestUrl = new URL(request.url.replace('/proxy', ''));
  return new URL(requestUrl.pathname, proxyUrl);
};

export const ALL: APIRoute = async ({ request }) => {
  const proxyUrl = getProxyUrl(request);
  const response = await fetch(proxyUrl.href, request);
  console.log("proxy status", response.status)
  return new Response(response.body);
};
