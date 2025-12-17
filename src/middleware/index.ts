import { getToken, validateToken } from '@navikt/oasis';
import { isLocal } from '@src/utils/server/environment.js';
import { defineMiddleware } from 'astro/middleware';
import { loginUrl } from '@src/utils/server/urls.ts';

const redirectUrl = import.meta.env.REDIRECT_URL as string | undefined;

export const onRequest = defineMiddleware(async (context, next) => {
  // Bypass redirect for health checks and all API routes
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  const isHealthCheck = pathname.startsWith('/api/internal/isAlive') || pathname.startsWith('/api/internal/isReady');
  const isApiRoute = pathname.startsWith('/api/');

  if (!isHealthCheck && !isApiRoute && redirectUrl) {
    return context.redirect(redirectUrl);
  }

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

  context.locals.token = token;
  return next();
});
