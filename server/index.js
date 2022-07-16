require('dotenv').config({path: './config.env'});
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then((result) => console.log("Connected to database."))
  .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

const server = app.listen(3001, () => console.log("Server: listening at http://localhost:3001"))

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged error: ${error}`)
  server.close(() => process.exit(1))
})