import type { AstroGlobal } from 'astro';

/**
 * Read and validate redirect URL from environment.
 * Returns null if not set or clearly invalid.
 */
export function getRedirectUrl(): string | null {
  const raw = import.meta.env.REDIRECT_URL as string | undefined;

  if (!raw) {
    return null;
  }

  const url = raw.trim();

  if (!url) {
    return null;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return null;
  }

  return url;
}

/**
 * Helper to perform a redirect from an Astro page, if REDIRECT_URL is configured.
 */
export function maybeRedirect(Astro: AstroGlobal) {
  const redirectUrl = getRedirectUrl();

  if (redirectUrl) {
    return Astro.redirect(redirectUrl);
  }

  return undefined;
}
