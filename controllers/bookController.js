import pool from "../db/db.js";
import axios from "axios"; // install with: npm install axios

// 📄 Render Add Book page with books from DB
export const renderAddBook = async (req, res) => {
  try {
    const { rows: books } = await pool.query(
      "SELECT * FROM books ORDER BY created_at DESC"
    );
    res.render("addBook", { books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Server error");
  }
};

// ➕ Handle book submission (add to DB)
export const addBook = async (req, res) => {
  const { isbn, date_read, rating, review, progress_status } = req.body;

  try {
    // 1️⃣ Fetch book details from Open Library API using ISBN
    const { data } = await axios.get(
      `https://openlibrary.org/api/books`,
      {
        params: {
          bibkeys: `ISBN:${isbn}`,
          jscmd: "data",
          format: "json"
        }
      }
    );

    const bookData = data[`ISBN:${isbn}`];
    if (!bookData) {
      return res.status(404).send("Book not found in Open Library API");
    }

    const title = bookData.title || "Unknown Title";
    const author = bookData.authors?.map(a => a.name).join(", ") || "Unknown Author";
    const olid = bookData.identifiers?.openlibrary?.[0] || null;
    const cover_url = bookData.cover?.large || bookData.cover?.medium || null;

    // 2️⃣ Insert into DB
    await pool.query(
      `INSERT INTO books 
        (title, author, isbn, olid, cover_url, date_read, rating, review, progress_status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [title, author, isbn, olid, cover_url, date_read, rating, review, progress_status]
    );

    // 3️⃣ Redirect back to Add Book page
    res.redirect("/");

  } catch (error) {
    console.error("Error adding book:", error.message);
    res.status(500).send("Server error");
  }
};
