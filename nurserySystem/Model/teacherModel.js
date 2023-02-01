const mongoose = require("mongoose")

const teacherSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  fullName: {
    type: String,
    min: 6,
    max: 20,
  },
  password: {
    type: String,
    min: 8,
    validate: [
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&?"])[a-zA-Z0-9!#$%&?]/,
      "invalid Password",
    ],
  },
  email: {
    type: String,
    validate: [/\w{6,20}@\w{3,7}\.\w{2,3}/g, , "invalid Email"],
  },
  image: { type: String, required: false },
})

module.exports = mongoose.model("Teacher", teacherSchema)
