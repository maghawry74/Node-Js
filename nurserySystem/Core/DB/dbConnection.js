const mongoose = require("mongoose")
mongoose.set("strictQuery", true)
const uri =
  "mongodb+srv://maghawry:sFVdN3jX3fx1S5gt@nurserysystemdb.8ycptoo.mongodb.net/NurserySystemDB?retryWrites=true&w=majority"
module.exports = mongoose.connect(process.env.DB_URL)
