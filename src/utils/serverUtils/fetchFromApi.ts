import { apiUrl, isLocal } from './urls.ts';
import { getOboToken } from '@src/utils/serverUtils/getOboToken.ts';
import type { APIContext } from 'astro';

export const fetchFromApi = async (context: APIContext, apiURL: URL) => {
  const oboToken = isLocal ? 'fake token' : await getOboToken(context.request);
  const method = context.request.method;
  const requestBody = context.request.body;
  const requestHeaders = context.request.headers;

  requestHeaders.append('Authorization', `Bearer ${oboToken}`);

  console.log(oboToken.substring(0, 6));

  const response = await fetch(apiURL.href, {
    method: method,
    body: requestBody,
    headers: requestHeaders,
  });

  const contentType = response.headers.get('content-type');

  console.log(response);
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
