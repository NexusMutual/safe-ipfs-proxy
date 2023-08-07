const express = require("express");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer();

const app = express();
const PORT = 3000;

app.use("/ipfs/:rest", (req, res) => {
  const { rest } = req.params;
  console;
  proxy.web(req, res, { target: "/ipfs" });

  proxy.on("proxyRes", function (proxyRes, req, res) {
    // modify the Content-Type to be text/plain
    proxyRes.headers["content-type"] = "text/plain";
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
