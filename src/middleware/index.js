import { getToken, validateToken } from '@navikt/oasis';
import { isLocal } from '@src/utils/environment';
import { defineMiddleware } from 'astro/middleware';
import { loginUrl } from '../utils/serverUtils/urls.ts';

export const onRequest = defineMiddleware(async (context, next) => {
  const token = getToken(context.request.headers);
  if (isLocal) {
    return next();
  }
  if (context.request.url.includes('/internal')) {
    return next();
  }
  if (!token) {
    console.log("Token not found");
    return context.redirect(loginUrl(context.url.toString())
    );
  }
  const validation = await validateToken(token);
  if (!validation.ok) {
    console.log("Validation failed!");
    return context.redirect(loginUrl(context.url.toString()));
  }

  //Obo-token trengs ikke med mindre kall skal gjennom proxy
  /*
  const apiScope = `api://${process.env.NAIS_CLUSTER_NAME}.a11y-statement.a11y-statement/.default`
  const obo = await requestOboToken(token, apiScope);
  if(!obo.ok){
    console.log("Fail on-behalf-of token for api")
    console.log(obo.error)
  }

  const parse = parseAzureUserToken(token);
  if (parse.ok) {
    console.log(`name: ${parse.preferred_username}`);
    const name = await parse.name;
    console.log(`name: ${name}`);
  }*/
  return next()
});
