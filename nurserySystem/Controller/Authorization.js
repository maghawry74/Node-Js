const { response } = require("express")
const jwt = require("jsonwebtoken")
module.exports = (request, response, next) => {
  if (request.header("authorization")) {
    let token = request.header("authorization").split(" ")[1]
    let result = jwt.verify(token, process.env.SECRETKEY)
    console.log(result)
    request.role = result.role
    request.id = result.id
    next()
  } else {
    let error = new Error("Not Authenticated")
    error.status = 401
    next(error)
  }
}
module.exports.checkAdmin = (request, response, next) => {
  if (request.role != "admin") {
    let error = new Error("Not authorized")
    error.status = 402
    next(error)
  }
  next()
}
