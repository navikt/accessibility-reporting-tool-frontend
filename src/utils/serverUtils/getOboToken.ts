import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { loginUrl } from '@src/utils/serverUtils/urls.ts';
import type { APIContext } from 'astro';
import { isLocal } from '@src/utils/environment.ts';


export const getOboToken = async (request: APIContext['request']): Promise<string> => {

  const token = getToken(request.headers);
  const apiScope = `api://${process.env.NAIS_CLUSTER_NAME}.a11y-statement.a11y-statement/.default`;
  const url = request.url;

  if (!token) {
    console.log(`Token for ${url} er undefined`);
    throw new Error(`Token for ${url} is undefined`);
  }

  const obo = await requestOboToken(token, apiScope);
  if (!obo.ok) {
    console.log('Fail on-behalf-of token for api');
    throw new Error(`Request oboToken for a11y-statement backend failed`);
  }

  return obo.token;
};