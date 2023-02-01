const { body, param, query } = require("express-validator")
module.exports.post = [
  body("_id").isInt().withMessage("_id Must Be a Number"),
  body("fullName")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("FullName Must Be a String")
    .isLength({ max: 20, min: 6 })
    .withMessage("FullName Must Be  6 to 20 charachers"),
  body("age").isInt().withMessage("Age Must Be a Number"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level Must Be in PreKG,KG1,KG2"),
  body("address").isObject().withMessage("Address Must Be an Object"),
  body("address.city").isAlpha().withMessage("City Must be a String"),
  body("address.street").isInt().withMessage("Street Must be a Number"),
  body("address.building").isInt().withMessage("Building Must be a Number"),
]
module.exports.patch = [
  [
    body("_id")
      .exists()
      .withMessage("_id is Required")
      .isInt()
      .withMessage("_id Must Be a Number"),
    body("fullName")
      .optional()
      .isAlpha()
      .withMessage("FullName Must Be a String")
      .isLength({ max: 20, min: 6 })
      .withMessage("FullName Must Be  6 to 20 charachers"),
    body("age").optional().isInt().withMessage("Age Must Be a Number"),
    body("level")
      .optional()
      .isIn(["PreKG", "KG1", "KG2"])
      .withMessage("Level Must Be in PreKG,KG1,KG2"),
    body("address").optional().isObject(),
    body("address.city")
      .optional()
      .isAlpha()
      .withMessage("City Must be a String"),
    body("address.street")
      .optional()
      .isInt()
      .withMessage("Street Must be a Number"),
    body("address.building")
      .optional()
      .isInt()
      .withMessage("Building Must be a Number"),
  ],
]
module.exports.delete = [
  [
    body("_id")
      .exists()
      .withMessage("_id is Required")
      .isInt()
      .withMessage("_id Must Be a Number"),
  ],
]
module.exports.paramidCheck = [
  [
    param("id")
      .exists()
      .withMessage("id is Required")
      .isInt()
      .withMessage("id Must Be a Number"),
  ],
]
