const express = require("express")
const classValidator = require("../Core/validations/classValidator")
const validationCheck = require("../Core/validations/checkValidations")
const {
  getAllClasses,
  getClass,
  getclassChilds,
  getclassTeacher,
  postClass,
  patchClass,
  deleteClass,
} = require("../Controller/classController")
const { checkAdmin } = require("../Controller/Authorization")

let classRoute = express.Router()
classRoute
  .route("/class")
  .get(checkAdmin, getAllClasses)
  .post(checkAdmin, classValidator.post, validationCheck, postClass)
  .patch(checkAdmin, classValidator.patch, validationCheck, patchClass)
  .delete(checkAdmin, classValidator.delete, validationCheck, deleteClass)

classRoute
  .route("/class/:id")
  .get(classValidator.paramidcheck, validationCheck, getClass)
classRoute
  .route("/classchildern/:id")
  .get(classValidator.paramidcheck, validationCheck, getclassChilds)
classRoute
  .route("/classTeacher/:id")
  .get(
    checkAdmin,
    classValidator.paramidcheck,
    validationCheck,
    getclassTeacher
  )
module.exports = classRoute
