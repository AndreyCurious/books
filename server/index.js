import express from "express";
import mongoose from "mongoose";
import Book from "./Book.js";
import Author from "./Author.js";
import router from "./router.js";
const PORT = 5000;
const DEAFULT_ID = 4;
const DB_URL = "mongodb+srv://ded14181998:kDGcbCmQSV9YgzXL@cluster0.8eacxim.mongodb.net/?retryWrites=true&w=majority"

const app = express();


app.use(express.json())
app.use('/api', router)



async function startApp () {
    await mongoose.connect(DB_URL, {useUnifiedTopology:true, useNewUrlParser: true})
    try {
        app.listen(PORT, () => console.log("server is work"));
    } catch(e) {
        console.log(e);
    }
}

startApp();

