import { getOboToken } from '@src/utils/server/getOboToken.ts';
import type { APIContext } from 'astro';

export const fetchFromApi = async (context: APIContext, apiUrl: URL) => {
  const oboToken = await getOboToken(context.locals.token);
  const method = context.request.method;

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

  const response = await fetch(apiUrl.href, requestInit);

  if (!response.ok) {
    console.log(
      `Failed to fetch data from api ${apiUrl.href} status text: ${response.statusText} and status code: ${response.status}`,
    );

    return new Response(JSON.stringify({}), {
      status: response.status,
      headers: response.headers,
    });
  }

  const jsonData = await response.text();
  return new Response(jsonData);
};
