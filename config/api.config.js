const apiConfig = {
  API_URL: process.env.API_URL || 'https://directual.com',
  AUTH_PATH: process.env.AUTH_PATH || '/good/v4/auth',
  API_PATH: process.env.API_PATH || '/good/api/v3',
  API_PATH_SL: process.env.API_PATH_SL || '/good/api/v5',
  API_TOKEN: process.env.API_TOKEN,
  API_PASSWORD: process.env.API_PASSWORD,
  NETWORK_ID: process.env.NETWORK_ID,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};

module.exports = apiConfig;
