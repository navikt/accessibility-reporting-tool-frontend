import { getEnvironment } from "@src/urls";

const REDIRECT_URI = {
  development: "https://www.intern.dev.nav.no/minside/utkast",
  production: "https://www.nav.no/minside/utkast",
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/minside/utkast/oauth2/login?redirect=${redirectUri}`;
