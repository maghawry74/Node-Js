const { validationResult } = require("express-validator")
module.exports = (request, response, next) => {
  let result = validationResult(request)
  if (!result.errors.length) {
    next()
  } else {
    let errorMessage = result.errors.reduce(
      (acc, item) => `${acc}  ${item.msg}`,
      ""
    )
    next(errorMessage)
  }
}
