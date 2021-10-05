var express = require("express");
var router = express.Router();

const app = express();

// router.get("/", (req, res, next) => {
//   res.send("Hello from Node");
// });

router.get("/", (req, res, next) => {
  res.render("home");
});

module.exports = router;
