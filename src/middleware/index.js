import { getToken, validateToken, parseAzureUserToken } from '@navikt/oasis';
import { isLocal } from '@src/utils/environment';
import { defineMiddleware } from 'astro/middleware';
import { loginUrl } from './urls';

export const onRequest = defineMiddleware(async (context, next) => {
  console.log('Running middleware');

  const token = getToken(context.request.headers);
  console.log(`Token: ${token}`);
  if (isLocal) {
    return next();
  }
  if (context.request.url.includes('/internal')) {
    return next();
  }
  if (!token) {
    console.log("Token not found");
    console.log(loginUrl(context.url.toString()));
    return context.redirect(loginUrl(context.url.toString())
    );
  }
  const validation = await validateToken(token);
  if (!validation.ok) {
    console.log("Validation failed!");
    return context.redirect(loginUrl(context.url.toString()));
  }

  const parse = parseAzureUserToken(token);
  if (parse.ok) {
    console.log(`name: ${parse.preferred_username} (${parse.NAVident})`);
    const name = await parse.name;
    console.log(`name: ${name}`);
  }
  return next()
});
