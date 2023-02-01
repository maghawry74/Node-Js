const express = require("express")

let loginRoute = express.Router()
const loginAuthentication = require("../Controller/loginCotroller")
loginRoute.route("/login").get(loginAuthentication)

module.exports = loginRoute
