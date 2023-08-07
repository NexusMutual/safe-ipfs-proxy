var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/ipfs/:hash", async (req, res) => {
  const { hash } = req.params;
  console.log("hash", hash);

  // const allowed = [
  //   "application/pdf",
  //   "image/jpeg",
  //   "image/png",
  //   "application/json",
  //   "image/webp",
  // ];

  // if (!allowed.includes(req.headers["content-type"])) {
  //   res.header("Content-Type", "text/plain");
  // }

  fetch(
    `https://nexusmutual.infura-ipfs.io/ipfs/${hash}`
    // {
    //   method: req.method,
    // }
  )
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = app;

// allow pdf, jpg, png, json, webp
