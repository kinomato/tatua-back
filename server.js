require('dotenv').config();
const config = require('config')
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// middleware
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');

// model
const auth = require('./modules/auth');
const user = require('./modules/user-module');
const product =require('./modules/product-module');
const promo =require('./modules/promo-module');
const topp = require('./modules/topp-module');

// const mongoClient = require('mongodb').MongoClient;
const dbdat = config.get('mongoUrlDat');
const dbky = process.env.KY;

// connect DB
mongoose.connect(dbky,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
)
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/api/move/order', order); // ('api/order') => sai
// app.use('/api/move/promo', promo);
app.use('/api/move/user', user);
app.use('/api/move/auth', auth);
app.use('/api/move/product',product);
app.use('/api/move/promo',promo);
app.use('/api/move/topp',topp)
// app.use('/api/move/driver', driver);
// app.use('/api/move/paytype', paytype);

app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT);
});