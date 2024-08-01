import type { APIRoute } from 'astro';
import { apiUrl } from '@src/utils/server/urls.ts';
import { fetchFromApi } from '@src/utils/server/fetchFromApi.ts';

const retrieveSourceApiUrl = (request: Request) => {
  const proxyUrl = new URL(apiUrl);
  const requestUrl = new URL(request.url.replace('/proxy', ''));
  return new URL(requestUrl.pathname, proxyUrl);
};

export const ALL: APIRoute = async (context) => {
  const proxyUrl = retrieveSourceApiUrl(context.request);
  return fetchFromApi(context, proxyUrl);
};
