const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (
  req,
  res,
  next
) => {

  try {

    let token;

    // Get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

      console.log(
        "TOKEN:",
        token
      );

      // Verify token
      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      console.log(
        "DECODED:",
        decoded
      );

      // Get user
      req.user =
        await User.findById(
          decoded.id
        ).select(
          "-password"
        );

      if (!req.user) {
        return res
          .status(401)
          .json({
            message:
              "User not found",
          });
      }

      next();

    } else {

      return res
        .status(401)
        .json({
          message:
            "No token found",
        });
    }

  } catch (error) {

    console.log(
      "AUTH ERROR:",
      error
    );

    return res
      .status(401)
      .json({
        message:
          "Token failed",
      });
  }
};

module.exports = {
  protect,
};