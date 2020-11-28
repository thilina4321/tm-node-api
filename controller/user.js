// npm
const bcrypt = require("bcryptjs");
//team
const User = require("../model/user");
const Task = require('../model/task')

exports.createUser = async (req, res) => {
  const userData = req.body;
  if (!userData["password"]) {
    return res.status(400).send("Password is missing");
  }
  try {
    const password = await bcrypt.hash(userData["password"], 8);
    const user = await new User({ ...userData, password });
    const token = await user.generateJWToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.fetchUsers = async (req, res) => {
  res.send(req.user);
};

// exports.fetchUser = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).send({
//         error: "User is not found",
//       });
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// };

exports.updateUser = async (req, res) => {
  const id = req.user._id
  let user = req.body;

  if (user["password"]) {
    const password = await bcrypt.hash(user["password"], 8);
    user = { ...user, password };
    console.log(user);
  }

  try {
    const updateUser = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    res.send(updateUser);
  } catch (e) {
    res.send(e);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.user._id;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ error: "user is not found" });
    }
    await Task.deleteMany({owner:id})
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

//loging endpoint
exports.logingUser = async (req, res) => {
  const user = req.body;
  try {
    const userData = await User.findByEmailAndPassword(
      user.email,
      user.password
    );
    const tokenData = await userData.generateJWToken();
    res.send({ userData, tokenData });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(404).send(e)
  }
};


// logout from the all the accounts
exports.logoutFromAll = async(req,res)=>{
  try {
    req.user.tokens = []
    await req.user.save()
    res.send('Log out from all the accounts')
  } catch (e) {
    res.status(500).send()
  }
}