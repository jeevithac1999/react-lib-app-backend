require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookRouter = require("./routers/bookRouter");
const userRouter = require("./routers/userRouter");

const app = express();

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend for library running");
});

app.use('/books',bookRouter);
app.use('/user',userRouter);

const server = app.listen(8080, () => {
  console.log(`Server running in port ${server.address().port}`);
});