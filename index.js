const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
app.use(express.json());
//team
const userRoutes = require("./router/user");
const taskRoutes = require('./router/task')

//routes
app.use(userRoutes);
app.use(taskRoutes);

console.log('hello');

// server running port and database running
app.listen(port, () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/tasks", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify:false
    })
    .then(() => {
      console.log("server runs on port " + port);
    })
    .catch((e) => {});
});
