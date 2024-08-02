enum ENV {
  local = 'local',
  development = 'development',
  production = 'production',
}

const getEnvironment = (): ENV => {
  if (window.location.href.includes('dev.nav.no')) {
    return ENV.development;
  }
  if (window.location.href.includes('ansatt.nav.no')) {
    return ENV.production;
  }
  return ENV.local;
};

const getDevBaseUrl = () => {
  if (window.location.href.includes('beta.ansatt.dev.nav.no')) {
    return 'https://a11y-statement-ny-beta.ansatt.dev.nav.no';
  }
  return 'https://a11y-statement-ny.ansatt.dev.nav.no';
};

const BASE_URL: { [key in ENV]: string } = {
  local: 'http://localhost:4321',
  development: getDevBaseUrl(),
  production: 'https://a11y-statement-ny.ansatt.nav.no',
};

const API_PROXY_URL = `${BASE_URL[getEnvironment()]}/api/proxy`;

export const apiProxyUrl = API_PROXY_URL;
