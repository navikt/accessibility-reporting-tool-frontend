import { requestOboToken } from '@navikt/oasis';

const API_SCOPE = `api://${process.env.NAIS_CLUSTER_NAME}.a11y-statement.a11y-statement/.default`;

export const getOboToken = async (token: string): Promise<string> => {
  const oboResult = await requestOboToken(token, API_SCOPE);

  if (!oboResult.ok) {
    console.log('Fail on-behalf-of token for api');
    throw new Error(`Request oboToken for a11y-statement backend failed`);
  }

  return oboResult.token;
};
