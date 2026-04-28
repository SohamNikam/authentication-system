const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = async (ctx) => {
  const { email, password } = ctx.request.body;

  console.log("Payload received:", { email, password });

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: 'Email and password required'
    };
    return;
  }

  try {
    // 🔥 Query DB
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'User not found'
      };
      return;
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(`Entered password: ${bcrypt.hashSync(password, 10)} \n Password in DB: ${user.password}`);

    if (!isMatch) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'Invalid password'
      };
      return;
    }

    // ✅ Success
    ctx.body = {
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email
      }
    };

  } catch (error) {
    console.error(error);

    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Internal server error'
    };
  }
};

exports.signup = async (ctx) => {
  const { name, email, password } = ctx.request.body;

  console.log("Payload for signup: ", ctx.request.body);
  
  if (!name || !email || !password) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: 'All fields are required'
    };
    return;
  }

  try {
    // 🔍 Check if user already exists
    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      ctx.status = 409;
      ctx.body = {
        success: false,
        message: 'User already exists'
      };
      return;
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Insert user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    ctx.body = {
      success: true,
      message: 'User registered successfully',
      userId: result.insertId
    };

  } catch (error) {
    console.error(error);

    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Internal server error'
    };
  }
};