const pool = require("../db");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/token.service");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

async function register(req, res) {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { username, email, password } = value;

  try {
    const [existing] = await pool.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(409).json({ msg: "Email already used" });

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
      [username, email, passwordHash]
    );
    const userId = result.insertId;

    const accessToken = generateAccessToken({ id: userId, username });
    const refreshToken = generateRefreshToken({ id: userId });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ msg: "Registered 🎉", accessToken });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}

async function login(req, res) {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { email, password } = value;

  try {
    const [rows] = await pool.execute('SELECT id, username, password_hash FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ msg: 'Invalid credentials' });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ msg: 'Invalid credentials' });

    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ msg: `Welcome back, ${user.username}`, accessToken });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
}

async function profile(req, res) {
  try {
    const [rows] = await pool.execute('SELECT id, username, email, created_at FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ msg: 'User not found' });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error('Profile error', err);
    return res.status(500).json({ msg: 'Server error' });
  }
}

module.exports = { register, login, profile };
