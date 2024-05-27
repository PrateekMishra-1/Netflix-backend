//Step -1 
import express from 'express';
import dotenv from "dotenv"
import databaseConnection from './utils/database.js';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/userRoute.js"
import cors from "cors";

databaseConnection();

dotenv.config({
    path : ".env"
})

const app = express();

//middlewares
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin : "https://netflix-frontend-cyan.vercel.app",
    credentials : true
}

app.use(cors(corsOptions));

//api

app.use("/api/v1/user" , userRoute) //basically hum yahan bhi code likh sakte the but clean code ke liye controller & routes me daal diya hai



// const PORT = 8080;

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});
