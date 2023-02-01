const express = require("express")
let childValidator = require("../Core/validations/childValidator")
let validationCheck = require("../Core/validations/checkValidations")
const {
  getAllChilds,
  getChild,
  postChild,
  patchChild,
  deleteChild,
} = require("../Controller/childController")
let childRoute = express.Router()
const { checkAdmin } = require("../Controller/Authorization")

childRoute
  .route("/child")
  .get(checkAdmin, getAllChilds)
  .post(checkAdmin, childValidator.post, validationCheck, postChild)
  .patch(checkAdmin, childValidator.patch, validationCheck, patchChild)
  .delete(checkAdmin, childValidator.delete, validationCheck, deleteChild)
childRoute
  .route("/child/:id")
  .get(childValidator.paramidCheck, validationCheck, getChild)
module.exports = childRoute
