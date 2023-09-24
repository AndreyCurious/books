import mongoose, { Schema } from "mongoose";

const Author = new mongoose.Schema({
    author: {type: String, required: true},
    bio: {type: String, required: true},
    id: {type: Number},
    authorStrId: {type: String},
})

export default mongoose.model("Author", Author);