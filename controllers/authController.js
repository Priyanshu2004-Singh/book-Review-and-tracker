import bcrypt from 'bcrypt';
import pool from '../db/db.js';

// Render register page 
export const showRegister = (req, res) => {
  res.render('register');
};

// Render login page
export const showLogin = (req, res) => {
  res.render('login', {
    messages: {
      success: req.flash('success_msg'),
      error: req.flash('error_msg')
    }
  });
};

// Handle user registration
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await pool.query("SELECT * FROM users WHERE uname = $1", [username]);
    if (userExists.rows.length > 0) {
      req.flash('error_msg', '⚠️ Username already exists.');
      return res.redirect('/signup');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (uname, pwd) VALUES ($1, $2)',
      [username, hashedPassword]
    );

    req.flash('success_msg', '✅ Registration successful! Please log in.');
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', '❌ Error registering user.');
    res.redirect('/signup');
  }
};

// Handle user login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE uname = $1', [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.pwd)) {
      // Store user info in session
      req.session.user = {
        id: user.id,
        username: user.uname,
      };

      return res.redirect('/');
    } else {
      req.flash('error_msg', '❌ Invalid username or password.');
      return res.redirect('/login');
    }
  } catch (err) {
    console.error(err);
    req.flash('error_msg', '❌ Login error.');
    return res.redirect('/login');
  }
};

// Handle logout
export const logout = (req, res) => {
  req.flash('success_msg', '👋 Logged out successfully.');

  req.session.destroy(err => {
    if (err) {
      console.error(err);
      req.flash('error_msg', '⚠️ Logout failed.');
      return res.redirect('/');
    }

    res.redirect('/');
  });
};
