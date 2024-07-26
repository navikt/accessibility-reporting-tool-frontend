import { apiUrl, isLocal } from './urls.ts';
import { getOboToken } from '@src/utils/serverUtils/getOboToken.ts';
import type { APIContext } from 'astro';

export const fetchFromApi = async (context: APIContext, apiURL: URL) => {
  const oboToken = isLocal ? 'fake token' : await getOboToken(context.request);
  const method = context.request.method;
  const requestBody = JSON.stringify(await context.request.json());
  console.log(
    method,
    '*****************',
    method,
    context.request.body,
    await context.request.json(),
    JSON.stringify(context.request),
  );

  const requestInit: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${oboToken}`,
    },
  };

  console.log(method);

  if (method != 'GET' && requestBody) {
    requestInit.body = JSON.stringify(requestBody);
  }

  const response = await fetch(apiURL.href, requestInit);
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    console.log(
      `Failed to fetch data from api ${apiUrl} status code ${response.status}`,
    );
    return new Response(JSON.stringify({}), {
      status: response.status,
      headers: response.headers,
    });
  }
  if (contentType && contentType.includes('text')) {
    return new Response(JSON.stringify(await response.text()));
  }

  return new Response(JSON.stringify(await response.json()));
};
