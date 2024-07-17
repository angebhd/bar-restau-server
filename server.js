const express = require('express');
const bodyParser = require('body-parser');
const app = express();

///// Local functions --------------------------------
const { userSignin } = require('./contollers/userSignin');
const { userLogin } = require('./contollers/userLogin');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Login handling
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  userLogin({ username, password });
  // res.redirect("http://localhost:3000");
  res.end();
})

//Signin handling

app.post("/signin", (req, res) => {
  const { fullname, username, mail, password } = req.body;
  const role = 0;
  userSignin({ fullname, username, mail, password, role });
  res.redirect("http://localhost:3000/login");

  res.end();
})

const port = 3001;
app.listen(port, () => {
  console.log("Server running")
});