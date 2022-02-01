const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const tasks = require("./routes/tasks")
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

const port = 8080 || process.env.PORT
dotenv.config()

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Connected to MongoDB...."))
    .catch((err) => console.log("Error in connection to MongoDB : " + err))

//To render static files : 
app.use(express.static("./public"))

//middle ware 
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

//routes
app.use("/api/v1/tasks", tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(`App is connected to localhost:${port}`)
})