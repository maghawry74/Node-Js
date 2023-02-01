const mongoose = require("mongoose")
const AutoIncrement = require("mongoose-sequence")(mongoose)

let ClassSchema = mongoose.Schema(
  {
    _id: Number,
    name: {
      type: String,
      min: 6,
      max: 20,
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    children: [{ type: Number, ref: "Children" }],
  },
  { _id: false }
)
ClassSchema.plugin(AutoIncrement)
module.exports = mongoose.model("Class", ClassSchema)
