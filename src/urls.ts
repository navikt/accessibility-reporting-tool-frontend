enum ENV {
  development = 'development',
}

const isDevelopment = process.env.NAIS_CLUSTER_NAME === 'dev-gcp';
export const isLocal = process.env.NODE_ENV === 'development';

export const getEnvironment = () => {
  if (isLocal) {
    return 'local';
  }
  return 'development';
};

const API_URL = {
  local: 'http://localhost:8787/api',
  development: 'https://a11y-statement.ansatt.dev.nav.no/api',
  production: 'https://a11y-statement.ansatt.dev.nav.no/api',
};

export const loginUrl = (redirectUrl: string = '') =>
  `/oauth2/login?redirect=${redirectUrl}`;

export const apiUrl = API_URL[getEnvironment()];
