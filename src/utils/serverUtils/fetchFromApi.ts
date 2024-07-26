import { isLocal } from './urls.ts';
import { getOboToken } from '@src/utils/serverUtils/getOboToken.ts';
import type { APIContext } from 'astro';

export const fetchFromApi = async (context: APIContext, apiUrl: URL) => {
  const oboToken = isLocal ? 'fake token' : await getOboToken(context.request);
  const method = context.request.method;
  const requestBody = context.request.body;

  const requestInit: RequestInit = {
    body: context.request.body ?? undefined,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${oboToken}`
    },
    // @ts-expect-error - This is a valid option
    duplex: 'half'
  };

  console.log('----ResponseInit------', requestInit, '#######ResponseInit###### End');

  const response = await fetch(apiUrl.href, requestInit);
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    console.log("Not ok --------", response)
    console.log(
      `Failed to fetch data from api ${apiUrl.href} status text: ${response.statusText} and status code: ${response.status}`
    );
    return new Response(JSON.stringify({}), {
      status: response.status,
      headers: response.headers
    });
  }
  if (contentType && contentType.includes('text')) {
    return new Response(JSON.stringify(await response.text()));
  }

  return new Response(JSON.stringify(await response.json()));
};
