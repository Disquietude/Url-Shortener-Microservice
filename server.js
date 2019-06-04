const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/api/shorturl');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect(process.env.DATABASE)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

app.use('/api/shorturl', routes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));