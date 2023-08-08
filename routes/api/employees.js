// sub directory

const express = require("express");
const router = express();
// const path = require("path");
// temp
const data = {};
data.employees = require("../../data/employees.json");

// Routing
// chain different http method
router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

// other router
router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

// export
module.exports = router;
