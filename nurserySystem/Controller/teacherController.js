const teacherSchema = require("../Model/teacherModel")
const ClassSchema = require("../Model/classModel")
const bcrypt = require("bcrypt")
let getAllTeachers = (request, response, next) => {
  teacherSchema
    .find({}, { __v: 0 })
    .then((data) => {
      response.status(200).json({ data })
    })
    .catch((error) => next(error))
}
let postTeacher = async (request, response, next) => {
  try {
    let hashedPassword = await bcrypt.hash(request.body.password, 10)
    request.body.password = hashedPassword
    let data = await teacherSchema.insertMany(request.body)
    response.status(201).json({ data })
  } catch (error) {
    next(error)
  }
}
let patchTeacher = async (request, response, next) => {
  try {
    if (request.body.password) {
      let hashedPassword = await bcrypt.hash(request.body.password, 10)
      request.body.password = hashedPassword
    }
    let data = await teacherSchema.updateOne(
      { _id: request.body._id },
      request.body
    )
    if (data.matchedCount == 0) {
      throw new Error("Teacher is Not Founded")
    } else {
      response.status(200).json({ data })
    }
  } catch (error) {
    next(error)
  }
}
let deleteTeacher = async (request, response, next) => {
  try {
    let data = await teacherSchema.deleteOne({ _id: request.body._id })
    if (data.deletedCount == 0) {
      throw new Error("Teacher is Not Founded")
    } else {
      response.status(200).json({ data })
    }
  } catch (error) {
    next(error)
  }
  let classes = await ClassSchema.updateMany(
    { supervisor: request.body._id },
    { $set: { supervisor: null } }
  )
  console.log(classes)
}

module.exports = {
  getAllTeachers,
  postTeacher,
  patchTeacher,
  deleteTeacher,
}
