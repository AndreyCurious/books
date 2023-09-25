import mongoose from "mongoose";

const Book = new mongoose.Schema({
    title: {type: String, required: true},
    id: {type: Number},
    authorStrId: {type: String},
})

export default mongoose.model("Book", Book);