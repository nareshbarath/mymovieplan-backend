require("dotenv").config();
const cors = require("cors");
const express = require("express");
require("./src/database/databaseConnection");
const {
  userRouter,
  authRouter,
  genreRouter,
  movieRouter,
  showRouter
} = require("./src/routes/index");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ status: true, message: "Medicare backend" });
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/genre", genreRouter);
app.use("/movie", movieRouter);
app.use("/shows", showRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App running on port ${process.env.PORT || 3000}`);
  }
});
