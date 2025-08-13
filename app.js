import express from "express";
import session from 'express-session';
import path from "path";
import flash from 'connect-flash';
import { fileURLToPath } from "url";
import homeRoute from './routes/homeRoute.js'
import authRoute from "./routes/authRoute.js"
import bookRoute from "./routes/bookRoute.js"

const app = express();  

// ESM dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Session Setting
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true
  })
);
// For flassy msg::
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(homeRoute)
app.use(authRoute)
app.use(bookRoute)
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
