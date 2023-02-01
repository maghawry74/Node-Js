console.clear()
let port = process.env.PORT || 3000
const connectDB = require("./controllers/db/connect")
const {
  getTasks,
  getTask,
  updateTask: patchTask,
  deleteTask,
  postTask,
} = require("./controllers/Routes/Tasks")
const express = require("express")
const server = express()
connectDB()
  .then(() => {
    server.listen(port, console.log(`Server is Listening on Port ${port} `))
  })
  .catch((error) => console.log(error))
server.use(express.json())
server.use(express.static("./public"))
server.get("/", (req, res) => {
  res.sendFile("./public/index.html")
})
server.get("/api/v1/tasks", getTasks)
server.post("/api/v1/tasks", postTask)
server.get("/api/v1/tasks/:id", getTask)
server.patch("/api/v1/tasks/:id", patchTask)
server.delete("/api/v1/tasks/:id", deleteTask)

server.use((error, req, res, next) => {
  res.status(400).json({ sucess: false, message: `${error}` })
})
