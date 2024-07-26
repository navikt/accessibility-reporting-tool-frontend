import { apiUrl, isLocal } from './urls.ts';
import { getOboToken } from '@src/utils/serverUtils/getOboToken.ts';
import type { APIContext } from 'astro';

export const fetchFromApi = async (context: APIContext, apiURL: URL) => {
  const oboToken = isLocal ? 'fake token' : await getOboToken(context.request);
  const url = context.request.url;
  const method = context.request.method;
  const requestBody = context.request.body;

  console.log(apiURL.href)
  const response = await fetch(apiURL.href)/*, {
    method: method,
    headers: {
      Authorization: `Bearer ${oboToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });*/

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
