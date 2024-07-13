import { getToken, validateToken, parseAzureUserToken } from '@navikt/oasis';
import { isLocal } from '@src/utils/environment';
import { defineMiddleware } from 'astro/middleware';

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
    console.log('No token');
    return next(); // context.redirect('/oauth2/login');
  }
  const validation = await validateToken(token);
  if (!validation.ok) {
    console.log('Token is not valid');
    return context.redirect('/oauth2/login');
  }
  // const obo = await requestOboToken(token, 'an:example:audience');
  // if (!obo.ok) {
  // }
  // fetch('https://a11y-statement.ansatt.dev.nav.no/api', {
  //   headers: { Authorization: `Bearer ${obo.token}` },
  // });

  const parse = parseAzureUserToken(token);
  if (parse.ok) {
    console.log(`name: ${parse.preferred_username} (${parse.NAVident})`);
    const name = await parse.name;
    console.log(`name: ${name}`);
  }
});
