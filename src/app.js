const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const app = express();
const port = 5000;

app.set("view engine", "ejs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/form", urlencodedParser, [
 check('username', 'max length should be 32')
 .isString()
 .isLength({max:32}),
 check('email', 'Email is not valid')
 .isEmail()
 .normalizeEmail(),
 check('password', 'password should be between 4 and 8')
 .isLength({min:4,max:8})
 .matches="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", 
 check('age', 'min should be 21')
 .isNumeric({min:21})

],(req, res) => {
  const errors= validationResult(req)
  if(!errors.isEmpty()){
    const alert = errors.array()
    res.render("form",{alert})
  }
});

app.listen(port, () => {
  console.log(`listening to port: ${port}`);
});
