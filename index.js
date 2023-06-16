const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);


// MONGODB SETUP

const PORT = process.env.PORT || 8050;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(`Server didn't connect : ${err}`);
  });
