const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT;
app.use(express.json());
//team
const userRoutes = require("./router/user");
const taskRoutes = require("./router/task");

//routes
app.use(userRoutes);
app.use(taskRoutes);


// const multer = require('multer')

// const upload = multer({
//   dest:'images',
//   limits:{
//     fieldSize:1000000
//   },
//   fileFilter(req,file,cb){
//     if(!file.originalname.match(/\.(jpg)$/)){
//       return cb(new Error('Please upload the image'))
//     }
//     return cb(undefined, true)
//   }
// })
// app.post('/upload', upload.single('image'), (req,res)=>{
//   res.send()
// }, (error, req,res,next)=>{
//   res.status(400).send({'error':error.message})
// })


mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('connect succse');
    
  })
  .catch((e) => {});
  
  
  // server running port and database running
  app.listen(port, () => {
    console.log("server runs on port " + port);
  
});
