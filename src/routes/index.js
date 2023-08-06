const userRouter = require("./users");
const authRouter = require("./auth");
const genreRouter = require("./genres");
const movieRouter = require("./movies");
const showRouter = require("./shows");

module.exports = {
  userRouter,
  authRouter,
  genreRouter,
  movieRouter,
  showRouter
};
