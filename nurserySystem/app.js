console.clear()
let port = process.env.PORT || 8080
const express = require("express")
const logger = require("morgan")
require("dotenv").config()
const classRoute = require("./Routes/classRoute")
const childRoute = require("./Routes/childRoute")
const teacherRoute = require("./Routes/teacherRoute")
const loginRoute = require("./Routes/loginRoute")
const authorization = require("./Controller/Authorization")

const server = express()
require("./Core/DB/dbConnection")
  .then(() => {
    console.log("DB Connected")
    server.listen(port, () => {
      console.log(`Server is Listening on Port ${port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

//Logger MW
server.use(logger("tiny"))

//End Points
server.use(express.json())
server.use(loginRoute)
server.use(authorization)
server.use(childRoute)
server.use(teacherRoute)
server.use(classRoute)
//Not found MW
server.use((request, response, next) => {
  response.status(404).json({ message: "Page Not Found" })
})

//Error MW
server.use((error, request, response, next) => {
  response.status(error.status || 500).json({ message: `${error}` })
})
