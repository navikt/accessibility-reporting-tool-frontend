const isDevelopment = process.env.NAIS_CLUSTER_NAME === "dev-gcp";
export const isLocal = process.env.NODE_ENV === "development";

export const getEnvironment = () => {
  if (isDevelopment) {
    return "development";
  }

  if (isLocal) {
    return "development";
  }

  return "production";
};


type EnvUrl = { development: string; production: string; local: string };

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const BASE_URL: EnvUrl = {
  local: "https://www.dev.nav.no/minside/",
  development: "https://www.intern.dev.nav.no/minside/",
  production: "https://www.nav.no/minside/",
};
export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const utkastApiUrl = `${minSideProxyUrl}/utkast/v2/utkast`;
export const baseUrl = BASE_URL[getEnvironment()];