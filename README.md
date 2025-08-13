📚 Book Tracker & Review App
A Node.js + Express + PostgreSQL + EJS web app that helps you track, rate, and review books you’ve read — inspired by Derek Sivers’ book notes concept.
Users can log in, add books with cover images (via Open Library API or manual entry), give ratings & reviews, and see their personal reading history.

🚀 Features
🔐 User Authentication – Sign up, log in, and manage your own reading list.

➕ Add Books – Store title, author, ISBN, OLID, cover image, date read, rating, review, and reading progress.

🖼 Dynamic Covers – Fetch cover images via Open Library Covers API or custom URL.

📖 Track Reading Progress – Choose status: Want to Read, Reading, Completed.

🗂 Personal Dashboard – View, edit, and delete your own book entries.

🎨 Beautiful UI – Styled with Tailwind CSS for a clean and modern look.

🛠 Tech Stack
Backend: Node.js, Express.js

Frontend: EJS, Tailwind CSS

Database: PostgreSQL

Auth: express-session, bcrypt

API: Open Library Covers API

📂 Project Structure
php
Copy
Edit
📦 book-tracker
 ┣ 📂 controllers      # Route handlers for books & auth
 ┣ 📂 db               # Database connection & queries
 ┣ 📂 models           # SQL table models/schema
 ┣ 📂 public           # Static files (CSS, images, JS)
 ┣ 📂 routes           # Express routes
 ┣ 📂 views            # EJS templates
 ┣ 📜 .env.example     # Environment variables template
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┗ 📜 README.md
⚡ Getting Started
1️⃣ Clone the repo
bash
Copy
Edit
git clone https://github.com/yourusername/book-tracker.git
cd book-tracker
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Set up environment variables
Create a .env file from .env.example:

env
Copy
Edit
DATABASE_URL=postgresql://username:password@localhost:5432/booktracker
SESSION_SECRET=your_secret_key
4️⃣ Create database tables
Run your SQL schema in PostgreSQL:

sql
Copy
Edit
\i db/schema.sql
5️⃣ Start the app
bash
Copy
Edit
npm start
The app will be live at http://localhost:3000

📸 Screenshots
Add Book Page

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📜 License
This project is licensed under the MIT License.