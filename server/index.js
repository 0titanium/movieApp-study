const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 형태의 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");

// mongodb atlas connecting
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB atlas Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Connected!");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/favorite", require("./routes/favorite"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
