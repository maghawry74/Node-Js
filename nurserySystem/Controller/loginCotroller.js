const teacherSchema = require("../Model/teacherModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = async (request, response, next) => {
  if (request.body.name == "Maghawry" && request.body.password == "123456") {
    let token = jwt.sign(
      {
        role: "admin",
        name: request.body.name,
      },
      process.env.SECRETKEY
    )
    console.log(request.header("authorization"))
    response.status(200).json({ data: "Login As Admin", token })
  } else {
    try {
      let data = await teacherSchema.findOne({ fullName: request.body.name })
      if (data == null) throw new Error("Not Authenticated")
      console.log(data.password)
      let result = await bcrypt.compare(request.body.password, data.password)
      if (result) {
        let token = jwt.sign(
          {
            role: "teacher",
            name: data.fullName,
            id: data._id,
          },
          process.env.SECRETKEY
        )
        response.status(200).json({ data: "Login As Teacher", token })
      } else {
        throw new Error("Not Authenticated")
      }
    } catch (error) {
      error.status = 401
      next(error)
    }
  }
}
