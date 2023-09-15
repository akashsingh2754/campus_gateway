const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDatabase = require('./config/db')
const dotenv = require('dotenv')
const app = express();

dotenv.config({path:'config/config.env'});

const registerRoutes = require("./routes/registerRouter.js")
const loginRoutes = require("./routes/loginRouter.js")
const ideaRoutes = require("./routes/reviewRouter")

connectDatabase();



const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json(), urlencodedParser)
app.use(cors())

app.get("/",(req,res,next)=>{
    res.send("ff");
})

app.use("/signup", registerRoutes)
app.use("/login", loginRoutes)
app.use("/idea" , ideaRoutes)


const server = app.listen(process.env.PORT,()=>{
    console.log(`Backend server is working on https://localhost:${process.env.PORT}`)
})

