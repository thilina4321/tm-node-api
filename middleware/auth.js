const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
    console.log('hello');
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decordToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decordToken.id,
      "tokens.token": token,
    });
    if(!user){
        throw new Error()
    }
    req.user = user
    req.token = token
    next();
  } catch (e) {
      res.status(401).send('Authenticate first')
  }

};

module.exports = auth;
