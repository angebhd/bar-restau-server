const express = require('express');
// const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

/// DB connection
require('./config/dbconnection')

///// Local functions --------------------------------
const { userAuth, userData } = require('./controllers/user');
const {tables} = require('./controllers/tables');
// Middlewares
const { authenticateToken} = require('./middleware/userAuth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());


// Login handling
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  await userAuth.login({ username, password }, req, res);

})

//Signin handling

app.post("/signin", async (req, res) => {
  const { fullname, username, mail, password } = req.body;
  const role = 0;
  await userAuth.signin({ fullname, username, mail, password, role }, req, res);
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

app.get('/details', (req, res) => {
  console.log(req);
  console.log('\n');
  res.end()

})

///////// GET USERS DATAS

app.get('/getUsername', authenticateToken ,async(req, res) => {
  await userData.getUsername(req, res);
})

///////// TABLES
app.get('/api/getTables', async(req, res) => {
  await tables.getTables(req, res);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on ${port}`)
});