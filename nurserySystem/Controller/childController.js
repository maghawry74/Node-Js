const ChildrenSchema = require("../Model/childModel")
const ClassSchema = require("../Model/classModel")
let getAllChilds = (request, response, next) => {
  ChildrenSchema.find({}, { __v: 0 })
    .then((data) => {
      response.status(200).json({ data: data })
    })
    .catch((error) => next(error))
}

let getChild = (request, response, next) => {
  ChildrenSchema.findOne({ _id: request.params.id }, { __v: 0 })
    .then((data) => {
      if (data) {
        response.status(200).json({ data })
      } else {
        throw new Error("Child is Not Founded")
      }
    })
    .catch((error) => next(error))
}

let postChild = (request, response, next) => {
  let newChild = new ChildrenSchema({
    _id: request.body._id,
    fullName: request.body.fullName,
    age: request.body.age,
    level: request.body.level,
    address: request.body.address,
  })
  newChild
    .save()
    .then((data) => {
      response.status(201).json({ data })
    })
    .catch((error) => next(error))
}

let patchChild = (request, response, next) => {
  console.log(request.body)
  ChildrenSchema.updateOne({ _id: request.body._id }, request.body).then(
    (data) => {
      if (data.modifiedCount == 0) {
        throw new Error("Child is Not Founded")
      } else {
        response.status(200).json({ data })
      }
    }
  )
}

let deleteChild = async (request, response, next) => {
  try {
    let id = request.body._id
    let data = await ChildrenSchema.deleteOne({ _id: request.body._id })
    if (data.deletedCount == 0) {
      throw new Error("Child is Not Founded")
    } else {
      response.status(200).json({ data: "Deleted Successfully" })
    }
    await ClassSchema.updateMany(
      { children: { $elemMatch: { $eq: id } } },
      { $pull: { children: { $eq: id } } }
    )
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllChilds,
  getChild,
  postChild,
  patchChild,
  deleteChild,
}
