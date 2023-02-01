const express = require("express")
let validationCheck = require("../Core/validations/checkValidations")
const teacherValidator = require("../Core/validations/teacherValidator")

const {
  getAllTeachers,
  postTeacher,
  patchTeacher,
  deleteTeacher,
} = require("../Controller/teacherController")
const { checkAdmin } = require("../Controller/Authorization")
let teacherRoute = express.Router()

teacherRoute
  .route("/teachers")
  .get(checkAdmin, getAllTeachers)
  .post(checkAdmin, teacherValidator.post, validationCheck, postTeacher)
  .patch(teacherValidator.patch, validationCheck, patchTeacher)
  .delete(checkAdmin, teacherValidator.delete, validationCheck, deleteTeacher)
module.exports = teacherRoute
