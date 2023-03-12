
const { createProxyMiddleware } = require("http-proxy-middleware");

const { REACT_APP_SERVER_BASE, REACT_APP_SERVER_PORT } = process.env;

const proxyTarget = `${REACT_APP_SERVER_BASE}:${REACT_APP_SERVER_PORT}`;

console.log(`/api will be proxied to ${proxyTarget} for backend requests`);

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: proxyTarget,
      changeOrigin: true,
    })
  );
};

