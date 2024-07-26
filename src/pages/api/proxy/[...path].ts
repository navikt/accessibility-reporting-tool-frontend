import type { APIRoute } from 'astro';
import { apiUrl } from '@src/utils/serverUtils/urls.ts';
import { fetchFromApi } from '@src/utils/serverUtils/fetchFromApi.ts';

const getProxyUrl = (request: Request) => {
  const proxyUrl = new URL(apiUrl);
  const requestUrl = new URL(request.url.replace('/proxy', ''));
  return new URL(requestUrl.pathname, proxyUrl);
};



export const ALL: APIRoute = async (context) => {
  const proxyUrl = getProxyUrl(context.request);
  return fetchFromApi(context, proxyUrl);
};
