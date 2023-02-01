const mongoose = require("mongoose")
const connectionString = process.env.DB_URL
let connectToDB = () => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}
module.exports = connectToDB
