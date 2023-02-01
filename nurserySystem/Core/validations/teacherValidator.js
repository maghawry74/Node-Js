const { body, param, query } = require("express-validator")
module.exports.post = [
  body("_id").optional().isMongoId().withMessage("_id Must Be an ObjectId"),
  body("fullName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("fullName Must Be a String")
    .isLength({ max: 20, min: 6 })
    .withMessage("fullName Must Be  6 to 20 charachers"),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password Must be min 8 charachers with at least one lowercase, one Uppercase, one special characher,one Number and one Symbol "
    ),
  body("email")
    .isEmail()
    .withMessage("Email Must be in Formate email@domain.com"),
  body("image").isString().withMessage("Image Must be a String"),
]
module.exports.patch = [
  body("_id")
    .exists()
    .withMessage("_id is Required")
    .isMongoId()
    .withMessage("_id Must Be an ObjectId"),
  body("fullName")
    .optional()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("fullName Must Be a String")
    .isLength({ max: 20, min: 6 })
    .withMessage("fullName Must Be  6 to 20 charachers"),
  body("password")
    .optional()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password Must be min 8 charachers with at least one lowercase, one Uppercase, one special characher,one Number and one Symbol "
    ),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email Must be in Formate email@domain.com"),
  body("image").optional().isString().withMessage("Image Must be a String"),
]
module.exports.delete = [
  body("_id")
    .exists()
    .withMessage("_id is Required")
    .isMongoId()
    .withMessage("_id Must Be an ObjectId"),
]
