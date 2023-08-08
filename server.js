// express
const express = require("express");
const app = express();
// others
const path = require("path");
// port
const PORT = process.env.PORT || 3500;

// require custom function for middleware
// since logEvents has 2 exports now (logger, logEvents)
// thus, need to use destructuring syntax
const { logger } = require("./middleware/logEvents");

// custom middleware - logger form logEvents.js
app.use(logger);

// built-in middleware to handle urlencoded data
// in other words, format data
// "content-type: application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

// serve static files - where to put css, img, ... etc
app.use(express.static(path.join(__dirname, "/public")));
// serve static files - let router:subDir know to use static files
app.use("/subDir", express.static(path.join(__dirname, "/public")));

// router - root
app.use("/", require("./routes/root"));
// router - subDir
app.use("/subDir", require("./routes/subDir"));
// router - employees
app.use("/employees", require("./routes/api/employees"));

// Cross Origin Resource Sharing
const cors = require("cors");
// white list for cors
const whiteListForCORS = [
  // any of yourwebsite that is allowed
  "https://www.mysite.com",
  "http://localhost:3500",
  "https://www.google.com",
];
// cors option setting
const corsOptions = {
  origin: (origin, callback) => {
    // note: !origin is for if the origin is undefined during developement
    if (whiteListForCORS.indexOf(origin) !== -1 || !origin) {
      // if (whiteListForCORS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors."));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// // Routing
// // chaining route handler
// app.get(
//   "/chainingExample(.html)?",
//   (req, res, next) => {
//     console.log("chain 1");
//     console.log("call next()");
//     next();
//   },
//   (req, res) => {
//     console.log("chain 2");
//     res.send("res of chain 2");
//   }
// );

// // define function first, then call chaining using array
// const chainOne = (req, res, next) => {
//   console.log("1");
//   next();
// };
// const chainTwo = (req, res, next) => {
//   console.log("2");
//   next();
// };
// const chainThree = (req, res) => {
//   console.log("3");
//   res.send("Chain end");
// };
// app.get("/chainByFcn(.html)?", [chainOne, chainTwo, chainThree]);

// catch all
// app.get("/*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });
// catch all - different syntax
// where routing accept regex (*)
app.all("*", (req, res) => {
  res.status(404);
  // someting more detailed
  if (req.accepts("html")) {
    // if request a html file
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    // if request a json
    res.json({ error: "404 Not Found" });
  } else {
    // if request a txt
    res.type("txt").send("404 Not Found");
  }
});

// middleware - catch err
const errHandler = require("./middleware/errHandler");
app.use(errHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
