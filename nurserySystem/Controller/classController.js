const { body } = require("express-validator")
const ClassSchema = require("../Model/classModel")
const childSchema = require("../Model/childModel")
const teacherSchema = require("../Model/teacherModel")
let getAllClasses = (request, response, next) => {
  ClassSchema.find()
    .then((data) => {
      response.status(200).json({ data })
    })
    .catch((error) => next(error))
}
let getClass = (request, response, next) => {
  ClassSchema.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("Class is Not Founded")
      } else {
        response.status(200).json({ data })
      }
    })
    .catch((error) => next(error))
}
let getclassChilds = (request, response, next) => {
  ClassSchema.findOne({ _id: request.params.id }, { children: 1 })
    .populate({ path: "children", select: { __v: 0 } })
    .then((data) => {
      response.status(200).json({ data })
    })
    .catch((error) => next(error))
}
let getclassTeacher = (request, response, next) => {
  ClassSchema.findOne({ _id: request.params.id }, { supervisor: 1, _id: 0 })
    .populate({ path: "supervisor", select: { __v: 0 } })
    .then((data) => {
      response.status(200).json({ data })
    })
    .catch((error) => next(error))
}
let postClass = async (request, response, next) => {
  try {
    let newClass = new ClassSchema({
      _id: request.body._id,
      name: request.body.name,
      supervisor: request.body.supervisor,
      children: request.body.children,
    })
    let teacher = await teacherSchema.findOne({ _id: request.body.supervisor })
    if (teacher == null) {
      throw new Error(
        `The Teacher with Id : ${request.body.supervisor} is Not founded`
      )
    }
    let childCount = await childSchema
      .find({ _id: { $in: request.body.children } })
      .count()
    if (childCount != request.body.children.length) {
      throw new Error(`Childs are Not Founded`)
    }

    let data = await newClass.save()
    response.status(201).json({ data })
  } catch (error) {
    next(error)
  }
}
let patchClass = async (request, response, next) => {
  try {
    if (request.body.teacher != undefined) {
      let teacher = await teacherSchema.findOne({
        _id: request.body.supervisor,
      })
      if (teacher == null) {
        throw new Error(
          `The Teacher with Id : ${request.body.supervisor} is Not founded`
        )
      }
    }
    if (request.body.children != undefined) {
      let childCount = await childSchema
        .find({ _id: { $in: request.body.children } })
        .count()
      if (childCount != request.body.children.length) {
        throw new Error(`Childs are Not Founded`)
      }
    }
    let data = await ClassSchema.updateOne(
      { _id: request.body._id },
      request.body
    )
    if (data.modifiedCount == 0) {
      throw new Error("Class is Not Founded")
    } else {
      response.status(200).json({ data })
    }
  } catch (error) {
    next(error)
  }
}

let deleteClass = (request, response, next) => {
  ClassSchema.deleteOne({ _id: request.body._id })
    .then((data) => {
      if (data.deletedCount == 0) {
        response.status(200).json({ data: "Class is Not Founded" })
      } else {
        response.status(200).json({ data: "Class is Deleted" })
      }
    })
    .catch((error) => next(error))
}

module.exports = {
  getAllClasses,
  getclassChilds,
  getclassTeacher,
  postClass,
  patchClass,
  deleteClass,
  getClass,
}
