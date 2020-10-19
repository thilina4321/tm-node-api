const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
      type:Boolean,
      default:false
  },
});


module.exports = mongoose.model('task', TaskSchema)