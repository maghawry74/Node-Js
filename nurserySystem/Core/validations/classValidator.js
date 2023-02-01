const { body, param, query } = require("express-validator")
module.exports.post = [
  body("_id").optional().isInt().withMessage("_id Must Be a Number"),
  body("name")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name Must Be a String")
    .isLength({ max: 20, min: 6 })
    .withMessage("Name Must Be  6 to 20 charachers"),
  body("supervisor")
    .isMongoId()
    .withMessage("Supervisor Id  Must Be an ObjectId"),
  body("children").isArray().withMessage("Children Must Be an Array"),
  body("children[*]").isInt().withMessage("Children elements Must be Numbers"),
]
module.exports.patch = [
  body("_id")
    .exists()
    .withMessage("_id is Required")
    .isInt()
    .withMessage("_id Must Be a Number"),
  body("name")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name Must Be a String")
    .isLength({ max: 20, min: 6 })
    .withMessage("Name Must Be  6 to 20 charachers"),
  body("supervisor")
    .optional()
    .isMongoId()
    .withMessage("Supervisor Id  Must Be an ObjectId"),
  body("children").isArray().withMessage("Children Must Be an Array"),
  body("children[*]").isInt().withMessage("Children elements Must be Numbers"),
]
module.exports.delete = [
  body("_id")
    .exists()
    .withMessage("_id is Required")
    .isInt()
    .withMessage("_id Must Be a Number"),
]
module.exports.paramidcheck = [
  param("id")
    .exists()
    .withMessage("_id is Required")
    .isInt()
    .withMessage("_id Must Be a Number"),
]
