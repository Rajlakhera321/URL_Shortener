import express from 'express';
import mongoose from 'mongoose';
const app = express();
import {config} from 'dotenv'
config();
const port = process.env.PORT || 8000;
import route from './src/router/user.js';
import urlRoute from './src/router/url.js';
import cors from "cors";

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log(err);
})

app.use(cors());
app.use(express.json())
app.use("/app/v1", route);
app.use('/app/v1', urlRoute)

app.listen(port, ()=>console.log("server is running on port" + port));
