import { apiUrl, isLocal } from './urls.ts';
import { getOboToken } from '@src/utils/serverUtils/getOboToken.ts';
import type { APIContext } from 'astro';

export const fetchFromApi = async (context: APIContext, apiURL: URL) => {
  const oboToken = isLocal ? 'fake token' : await getOboToken(context.request);
  const method = context.request.method;
  const requestBody = context.request.body;

  const requestInit: RequestInit = {
    body: context.request.body ?? undefined,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${oboToken}`,
    },
    // @ts-expect-error - This is a valid option
    duplex: 'half',
  };

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
