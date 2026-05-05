export const PROJECT_NAME = 'Care App';

const trimEnvValue = (value) => (typeof value === 'string' ? value.trim() : '');
const rawApiUrl = trimEnvValue(process.env.REACT_APP_API_URL);
const normalizedApiUrl = rawApiUrl.replace(/\/+$/, '');
const derivedBaseUrl = normalizedApiUrl.endsWith('/api')
  ? normalizedApiUrl.replace(/\/api$/, '')
  : normalizedApiUrl;
const resolvedApiUrl = normalizedApiUrl
  ? normalizedApiUrl.endsWith('/api')
    ? normalizedApiUrl
    : `${normalizedApiUrl}/api`
  : `${derivedBaseUrl}/api`;

export const BASE_URL = derivedBaseUrl;
export const API_URL = resolvedApiUrl;
export const IMG_URL = BASE_URL;
export const MAP_API_KEY = trimEnvValue(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
export const COUNTRY_CODE = 'IN';
export const LOCAL_PATH = BASE_URL;
export const LOCAL_URL = API_URL;
