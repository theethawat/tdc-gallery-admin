import jwt from "jsonwebtoken";
import _ from "lodash";

import config from "../configs/app";
const secret = config.secret;

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, secret);
    return token;
  } catch (error) {
    throw new Error("Token cannot generate", error);
  }
};

const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, secret);

    // Add Another to more step check
    if (decode) {
      return true;
    }

    return false;
  } catch (error) {
    console.error(error.message);
    throw new Error("Cannot Verify your token", error);
  }
};

const verifyRequest = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = _.last(_.split(bearerToken, " "));
  try {
    if (verifyToken(token) === true) {
      console.log("Verify Request Pass");
      next();
    } else {
      console.log("Cannot Verify Request");
      res.status(403);
    }
  } catch (error) {
    console.log("Cannot Verify Request", error.message);

    res.status(403);
  }
};

export default { generateToken, verifyToken, verifyRequest };
