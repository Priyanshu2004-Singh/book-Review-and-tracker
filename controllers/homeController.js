

import pool from "../db/db.js";

export const homePage = async (req, res) => {
  try {
    // Fetch all books from DB, latest first
    const { rows: books } = await pool.query(
      `SELECT * FROM books ORDER BY created_at DESC`
    );

    res.render("home", {
      title: "Book Tracker",
      books,
      user: req.session.user || null
    });
  } catch (error) {
    console.error("Error loading homepage:", error);
    res.status(500).send("Server Error");
  }
};

