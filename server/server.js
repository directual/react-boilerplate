const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
// TODO: remove passport if not required
// const passport = require('passport');
const proxy = require('http-proxy-middleware');

const apiConfig = require('../config/api.config.js');


// require('./passport')(passport);

const authMiddleware = require('./middleware/middleware');


const SERVER_PORT = 8080;
const app = express();


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: 'super mts ihr secret',
  },
));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static(path.join(__dirname, '../build')));


app.use(['/good', '/fileUploaded/'], proxy({
  target: apiConfig.API_URL,
  changeOrigin: true, // needed for virtual hosted sites
  headers: {
    // Delete Authorization header.
    // Example:
    // http://hr.mts.directual.com uses http auth,
    // but we dont need to proxying this header to directual.com api.
    authorization: '',
  },
  pathRewrite(pathReq, req) {
    const pathname = pathReq.split('?')[0];

    let url = `${pathname}?appID=${apiConfig.API_TOKEN}&appSecret=${apiConfig.API_PASSWORD}`;

    if (!req.query) return url;

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
  authMiddleware.webUserAuthRequest(apiConfig),
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
  authMiddleware.googleAuthRequest(apiConfig),
  (req, res, next) => {
    if (!req.auth.err) {
      res.send(req.auth.response.data);
    } else {
      res.send(req.auth.err.response.data);
      console.log('error', req.auth.err);
      next();
    }
  },
);

app.get('/getGoogleClientId', authMiddleware.getGoogleClientId(), (req, res, next) => {
  if (!req.auth.err) {
    res.send(req.auth.response);
  } else {
    res.send(req.auth.err.response.data);
    console.log('error', req.auth.err);
    next();
  }
});

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../build') });
});


const server = app.listen(SERVER_PORT, () => {
  console.log(`start webserver: http://localhost:${SERVER_PORT} \nProxy url: ${apiConfig.API_URL}`);
});

server.setTimeout(5 * 60 * 1000);


module.exports = app;
