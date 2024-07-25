import type { APIRoute } from 'astro';
import { apiUrl } from '@src/urls.ts';

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL(apiUrl);
  const requestUrl = new URL(request.url.replace('/proxy', ''));
  return new URL(requestUrl.pathname, proxyUrl);
};

export const ALL: APIRoute = async ({ request }) => {
  const proxyUrl = getProxyUrl(request);
  const response = await fetch('https://a11y-statement.ansatt.dev.nav.no/api/users/details', {
      method: 'GET',
      credentials: 'include'
    }
  );

  console.log("--------", response.body, response.status);

  return new Response("response.body", { status: response.status });
};
