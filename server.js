const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const SECRET_KEY = "ange";
/// DB connection
require('./config/dbconnection')

///// Local functions --------------------------------
const { userAuth } = require('./contollers/userAuth');
// Middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/bar-restau-auth' }),
  cookie: { maxAge: 1000 * 60 * 60 } //eqtuivalent to 1hour
}))

// Login handling
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userAuth.login({ username, password });
  if (user) {

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' }); //generate token then send it
    res.json({ token });
    req.session.userId = user._id; // creating session
    console.log('session created');
    res.redirect('http://localhost:3000/');
  }
  res.end();
})

//Signin handling

app.post("/signin", (req, res) => {
  const { fullname, username, mail, password } = req.body;
  const role = 0;
  userAuth.signin({ fullname, username, mail, password, role });
  res.redirect("http://localhost:3000/login");
  res.end();
})
// logout handling
app.get('/logout', function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect("http://localhost:3000/login");
  });
});

const port = 3001;
app.listen(port, () => {
  console.log("Server running")
});