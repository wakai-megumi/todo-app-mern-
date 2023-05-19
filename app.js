import express from 'express'

import userRouter from "./routes/user.route.js"
import taskRouter from "./routes/task.route.js"
import { config } from "dotenv"
import cookieParser from 'cookie-parser';
import Errormiddleware from './utils/Errormiddleware.js';
import cors from 'cors'



export const app = express();



//middleware
config({
    path: "./data/.env"
})

app.use(cors({

    origin: [process.env.FRONTEND_CLIENT_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],

}))
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)

//error middleware 
app.use(Errormiddleware);





app.get('/', (req, res) => {
    res.status(200).json({
        message: "ok api working",

    })
})


