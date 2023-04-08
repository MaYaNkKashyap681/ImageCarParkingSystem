const express = require("express");
const connect = require("./mongodb/connect");
const cors = require('cors');
const app = express();

//global middleware
app.use(express.json());
app.use(cors())

//custom middleware
app.use('/parking', require('./routes/parkingRoute'))

const startServer = () => {
  const PORT = 3000;
  const mongoUrl = "mongodb://localhost/ParkingSystem";

  try {
    connect(mongoUrl);
    app.listen(PORT, () => {
      console.log("Server is Started on PORT" + PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
