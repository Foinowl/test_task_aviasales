const express = require("express")
const controllers = require("../controlers/users")


const router = express.Router()

router.route("/users").post(controllers.createUser)

router
	.route("/users/:id")
	.get(controllers.getUser)
	.patch(controllers.updateUser)

module.exports = router
