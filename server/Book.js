import mongoose, { Schema } from "mongoose";

const Book = new mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    id: {type: Number},
    authorStrId: {type: String},
})

export default mongoose.model("Book", Book);