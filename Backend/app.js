import express from 'express';
import 'dotenv/config'; 
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import cors from "cors"
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 3000;
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}))
;

app.use('/api', userRouter);
app.use('/api', adminRouter);


mongoose.connect("mongodb+srv://admin:dSwSlS7zbiVhqh6x@mernauth.9krmh.mongodb.net/?retryWrites=true&w=majority&appName=MernAuth").then(()=>{
    app.listen(`${port}`);
    console.log(`Database is connected! Listening to localhost ${port}`)
}).catch((err)=> console.log(err))



