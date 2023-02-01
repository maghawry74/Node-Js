const mongoose = require("mongoose")
const childSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  fullName: {
    type: String,
    max: 20,
    min: 6,
  },
  age: {
    type: Number,
  },
  level: { type: String, enum: ["PreKG", "KG1", "KG2"] },
  Address: {
    city: String,
    street: Number,
    building: Number,
  },
})
module.exports = mongoose.model("Children", childSchema)
