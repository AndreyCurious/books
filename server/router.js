import { Router } from "express";
import Book from "./Book.js";
import Author from "./Author.js";
import mongoose from "mongoose";

const router = new Router();

router.post('/books', async (req, res) => {
    try {
        const {author, title, bio} = req.body;
        const books = (await Book.find()).map((item) => item.id);
        const authors = (await Author.find()).map((item) => item.id);
        let idBooks = books.reduce((item, acc) => Math.max(Number(item), acc) , 0)
        let idAuth = authors.reduce((item, acc) => Math.max(Number(item), acc) , 0)
        const authId = new mongoose.Types.ObjectId();
        const book = await Book.create({title, authorStrId: authId, id: ++idBooks});
        const newauthor = await Author.create({author, bio, authorStrId: authId, id: ++idAuth});
        res.json({book, newauthor})
    } catch(e) {
        res.status(500).json(e);
    }
});
router.post('/books/redact', async (req, res) => {
    try {
        const {author, title, bio, authorStrId} = req.body;
        await Author.findOneAndUpdate({authorStrId: authorStrId}, {author: author, bio: bio});
        await Book.findOneAndUpdate({authorStrId: authorStrId}, {title: title});
        const authors = await Author.find()
        res.json(authors);
    } catch(e) {
        res.status(500).json(e);
    }
})
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch(e) {
        res.status(500).json(e);
    }
})
router.get('/authors', async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch(e) {
        res.status(500).json(e);
    }
})

export default router;