/* eslint-disable @typescript-eslint/no-var-requires */
const createProxyMiddleware = require("http-proxy-middleware");

const host = "http://localhost:3000/";
// const host = "http://143.198.49.77:8200/";
const controllers = ["/api", "/api/sign-wager-tx"];

const proxyAll = createProxyMiddleware("/", {
  target: host,
});

module.exports = (app) => {
  app.use((req, res, next) => {
    if (controllers.some((c) => req.path.startsWith(c))) {
      proxyAll(req, res, next);
    } else {
      next();
    }
  });
};
