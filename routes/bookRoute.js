import express from 'express';
import { addBook, renderAddBook } from "../controllers/bookController.js";
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router  = express.Router();

router.get("/add-book",ensureAuthenticated,renderAddBook)
router.post('/books/add',ensureAuthenticated,addBook)

export default router;