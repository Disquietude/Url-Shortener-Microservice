const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/api/shorturl');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors({optionsSuccessStatus: 200}));

mongoose.connect(process.env.DATABASE)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err));

app.use('/api/shorturl', routes);

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));