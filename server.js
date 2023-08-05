// express
const express = require("express");
const app = express();
// others
const path = require("path");
// port
const PORT = process.env.PORT || 3500;

// routing
// adding some regex: ^/|/index(.html)? -> with / only or /index or /index.html
app.get("^/$|/index(.html)?", (req, res) => {
  // method 1: using option to specify root dir
  //   res.sendFile("./views/index.html", { root: __dirname });
  // method 2: using path.join to specify root
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// re-direct
app.get("/old-page3(.html)?", (req, res) => {
  // Note: reditrect default status code is 302
  // specify 301 in redirect to change that
  res.redirect(301, "/new-page.html");
});

// chaining route handler
app.get(
  "/chainingExample(.html)?",
  (req, res, next) => {
    console.log("chain 1");
    console.log("call next()");
    next();
  },
  (req, res) => {
    console.log("chain 2");
    res.send("res of chain 2");
  }
);

// define function first, then call chaining using array
const chainOne = (req, res, next) => {
  console.log("1");
  next();
};
const chainTwo = (req, res, next) => {
  console.log("2");
  next();
};
const chainThree = (req, res) => {
  console.log("3");
  res.send("Chain end");
};
app.get("/chainByFcn(.html)?", [chainOne, chainTwo, chainThree]);

// catch all
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
