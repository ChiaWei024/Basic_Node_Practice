// sub directory

const express = require("express");
const router = express();
const path = require("path");

// routing
// adding some regex: ^/|/index(.html)? -> with / only or /index or /index.html
router.get("^/$|/index(.html)?", (req, res) => {
  // method 1: using option to specify root dir
  //   res.sendFile("./views/index.html", { root: __dirname });
  // method 2: using path.join to specify root
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

// re-direct
router.get("/old-page(.html)?", (req, res) => {
  // Note: reditrect default status code is 302
  // specify 301 in redirect to change that
  res.redirect(301, "/new-page.html");
});

// export
module.exports = router;
