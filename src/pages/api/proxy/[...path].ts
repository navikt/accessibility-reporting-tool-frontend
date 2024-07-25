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
    response = await fetch(proxyUrl.href, request).then((response) => {
      const response1 = response.text
      console.log(response)
      return response1
    }).then((body) => {
      console.log(body)
    });
    console.log(
      "\n Fetch-url: "+proxyUrl,
      'proxy status: ',
      response?.status,
      response?.body,
      '\n',
      response,
    );
  } catch (e) {
    console.log(
      "Fetch-url: "+proxyUrl,
      'proxy status: ',
      response?.status,
      response?.body,
      '\n',
      response,
    );
  }

  return new Response(response?.body);
};
