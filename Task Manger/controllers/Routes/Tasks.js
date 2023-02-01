const mongoose = require("mongoose")
let taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide a Name"],
    trim: true,
    maxlength: [20, "Max Length is 20"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})
let Tasks = mongoose.model("Task", taskSchema)

let getTasks = async (req, res) => {
  let allTasks = await Tasks.find({})
  res.status(200).json(allTasks)
}
let postTask = async (req, res) => {
  try {
    let task = await Tasks.create(req.body)
    res.json(task)
  } catch (e) {
    console.log(e)
  }
}
let getTask = async (req, res) => {
  let task = await Tasks.findOne({ name: req.params.id })
  if (task) {
    res.status(200).json(task)
  } else {
    res.status(400).json({ message: "Task not found" })
  }
}
let patchTask = async (req, res) => {
  await Tasks.updateOne({ name: req.params.id })
}
let deleteTask = async (req, res) => {
  let result = await Tasks.deleteOne({ name: req.params.id })
  console.log(result)
  res.json({ message: `${result.deletedCount}` })
}
module.exports = {
  getTask,
  postTask,
  getTasks,
  updateTask: patchTask,
  deleteTask,
}
