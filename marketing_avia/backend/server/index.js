const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

// import { router as usersRoutes } from "./routes/users"
const router = require("./routes/users")

const app = express()

app.use(bodyParser.json())
app.disable("x-powered-by")
app.use(cors())

app.use("/api", router)


const server = app.listen(3333, () => {
	console.log("Listening at http://localhost:" + 3333 + "/api")
})

server.on("error", console.error)