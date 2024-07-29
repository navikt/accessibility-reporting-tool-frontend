import { getToken, validateToken } from '@navikt/oasis';
import { isLocal } from '@src/utils/serverUtils/environment.js';
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
    console.log('Token not found');
    return context.redirect(loginUrl(context.url.toString()));
  }
  const validation = await validateToken(token);
  if (!validation.ok) {
    console.log('Validation failed!');
    return context.redirect(loginUrl(context.url.toString()));
  }
  return next();
});
