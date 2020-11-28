const Task = require("../model/task");
const User = require("../model/user");

exports.createTask = async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e); 
  }
};

exports.readTasks = async (req, res) => {
  const match = {}
  if(req.query.completed){
    match.completed = req.query.completed 
  }
  const sort = {}
  if(req.query.sortBy){
    const part = req.query.sortBy.split(':')
    sort[part[0]] = part[1] == 'desc'?-1:1
  }
  try {
    const tasks = await req.user.populate({
      path:'tasks',
      
      options:{
        limit:2,
        skip:0,
        sort
      }
    }).execPopulate()
    
    res.send(tasks.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.readTask = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.find({_id:id, owner:req.user._id});

    if (!task) {
      return res.status(404).send({
        error: "Task not found",
      });
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
};


exports.deleteTask = async(req,res)=>{
  const taskId = req.params.id
  try {
    const task = await Task.deleteOne({_id:taskId, owner:req.user._id})
    res.send(task)
  } catch (e) {
    res.status(500).send(e)
    
  }

}