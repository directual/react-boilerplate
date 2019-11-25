const axios = require('axios');


module.exports = {
  webUserAuthRequest(apiConfig) {
    const {
      API_URL, AUTH_PATH, API_TOKEN, NETWORK_ID,
    } = apiConfig;

    return (req, res, next) => {
      const { username, password } = req.body;

      const body = {
        username,
        password,
        networkId: NETWORK_ID,
        provider: 'rest',
        appID: API_TOKEN,
      };

      const uri = API_URL + AUTH_PATH;
      req.auth = {};

      return axios({
        method: 'POST',
        url: uri,
        data: body,
      })
        .then(response => {
          req.auth.response = response;
        })
        .catch(err => {
          req.auth.err = err;
        })
        .then(next);
    };
  },

  googleAuthRequest(apiConfig) {
    const {
      API_URL, AUTH_PATH, API_TOKEN, GOOGLE_CLIENT_ID,
    } = apiConfig;

    return (req, res, next) => {
      const { code } = req.body;
      const body = {
        provider: 'google',
        code,
        clientID: GOOGLE_CLIENT_ID,
        appID: API_TOKEN,
      };

      const location = API_URL + AUTH_PATH;
      const uri = location;

      req.auth = {};

      return axios({
        method: 'POST',
        url: uri,
        data: body,
      })
        .then(response => {
          req.auth.response = response;
        })
        .catch(err => {
          req.auth.err = err;
        })
        .then(next);
    };
  },

  getGoogleClientId() {
    return (req, res, next) => {
      req.auth = {};

      const CLIENT_ID = process.env.NODE_ENV === 'production'
        ? process.env.GOOGLE_CLIENT_ID
        : process.env.REACT_APP_GOOGLE_CLIENT_ID;

      req.auth.response = CLIENT_ID;
      next();
    };
  },
};
