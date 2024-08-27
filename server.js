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
const { tables } = require('./controllers/tables');
const { reservations } = require('./controllers/reservations');
const { menu } = require('./controllers/menu');
const { orders } = require('./controllers/orders');
// Middlewares
const { authenticateToken } = require('./middleware/userAuth');

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

app.get('/getUsername', authenticateToken, async (req, res) => {
  await userData.getUsername(req, res);
})

///////// TABLES
app.get('/api/getTables', async (req, res) => {
  await tables.getTables(req, res);
});


////////Reservations
app.post('/api/reservation/make', authenticateToken, async (req, res) => {
  await reservations.make(req, res);
})
app.post('/api/reservation/checkConflicts', authenticateToken, async (req, res) => {
  await reservations.checkConflict(req, res);
})

////menu
app.get('/api/menu/food', async (req, res) => {
  await menu.getFood(res);
});
app.get('/api/menu/drink', async (req, res) => {
  await menu.getDrink(res);
});
app.get('/api/menu/all', async (req, res) => {
  await menu.getAll(res);
});

////Orders

app.post('/api/order/make', authenticateToken, async (req, res) =>{
  await orders.make(req, res);
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on ${port}`)
});