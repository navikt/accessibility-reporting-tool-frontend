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
    const fetchResponse = await fetch(proxyUrl.href, request);
    response = fetchResponse;
  } catch (e) {
    console.log(
      'proxy status',
      response?.status,
      response?.body,
      '\n',
      response,
    );
  }

  return new Response(response?.body);
};
