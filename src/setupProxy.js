/* eslint-disable func-names */

const proxy = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const authMiddleware = require('../server/middleware/middleware');


module.exports = function (app) {
  // this is developement proxy https://create-react-app.dev/docs/proxying-api-requests-in-development

  app.use(['/good', '/fileUploaded/'], proxy({
    target: process.env.REACT_APP_API_URL,
    // needed for virtual hosted sites
    changeOrigin: true,
    pathRewrite(pathReq, req) {
      const pathname = pathReq.split('?')[0];

      let url = `${pathname}?appID=${process.env.REACT_APP_API_TOKEN}&appSecret=${process.env.REACT_APP_API_PASSWORD}`;

      url = Object
        .entries(req.query)
        .reduce(
          (newUrl, [key, value]) => `${newUrl}&${key}=${encodeURI(value)}`,
          url,
        );

      return url;
    },
  }));

  app.post(
    '/auth',
    bodyParser.json(),
    authMiddleware.webUserAuthRequest({
      API_URL: process.env.REACT_APP_API_URL,
      API_TOKEN: process.env.REACT_APP_API_TOKEN,
      AUTH_PATH: process.env.REACT_APP_AUTH_PATH,
      NETWORK_ID: process.env.REACT_APP_NETWORK_ID,
    }),
    (req, res, next) => {
      if (!req.auth.err) {
        res.send(req.auth.response.data);
      } else {
        res.send(req.auth.err.response.data);
        next();
      }
    },
  );

  app.post(
    '/auth/google',
    bodyParser.json(),
    authMiddleware.googleAuthRequest({
      API_URL: process.env.REACT_APP_API_URL,
      API_TOKEN: process.env.REACT_APP_API_TOKEN,
      AUTH_PATH: process.env.REACT_APP_AUTH_PATH,
      GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    }),
    (req, res, next) => {
      if (!req.auth.err) {
        res.send(req.auth.response.data);
      } else {
        res.send(req.auth.err.response.data);
        next();
      }
    },
  );

  app.get('/getGoogleClientId', authMiddleware.getGoogleClientId(), (req, res, next) => {
    if (!req.auth.err) {
      res.send(req.auth.response);
    } else {
      res.send(req.auth.err.response.data);
      next();
    }
  });
};
