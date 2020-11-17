const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const app = express();
const port = 5000;

app.set("view engine", "ejs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("", (req, res) => {
  res.render("index");
});

// app.get("/about", (req, res) => {
//     res.render("about");
//   });

app.post(
  "",
  urlencodedParser,
  [
    check("username", "The max-length should be 32")
      .exists()
      .isString()
      .isLength({ max: 32 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    check("password", "no special characters")
      .isLength({ min: 4 }, { max: 8 })
      .matches(/^(?!=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
    check("age", "should be greater than 21").isLength({ min: 21 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("", {
        alert
      });
    }
  }
);

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
