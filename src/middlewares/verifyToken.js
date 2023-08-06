const { verifyJWT } = require("../helpers/jwt");

const verifyAuth = async (req, res, next) => {
  try {
    let { authorization } = req.headers;
    authorization = authorization.slice(7, authorization.length);
    const { status, value } = await verifyJWT(authorization);
    if (!status)
      return res.status(401).json({ status: false, message: "Auth error" });

    res.user_id = value.id;
    res.email = value.email;
    res.role = value.role;
    next();
    // res.user_id = console.log(value);
  } catch (err) {
    res.status(401).json({ status: false, message: "Auth error" });
  }
};

module.exports = { verifyAuth };
