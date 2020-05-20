const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_Key;

exports.createToken = (email = "") => {
  const token = jwt.sign(
    {
      sub: "user",
      email
    },
    jwtKey,
    {
      expiresIn: "3 hours"
    }
  );
  return token;
};

exports.validateToken = (token = "") => {
  try{
    return jwt.verify(token, jwtKey)
  }catch (e){
    console.error(e);
    return false;
  }
};

