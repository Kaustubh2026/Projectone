const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Kaustubh28',
  database: process.env.MYSQL_DATABASE || 'nn',
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || '5a2383fce8122c925f018b0eff3ff64b90c7a573f59a669206142acb926ba59ffc02ef03525e72a414c6d0f8f4fdd7515fcf8a85266e933bef1ba387a9545d4ef30a2b50a2c9816adce455aa36e99bdc01b4ed9cd3c81a389fad43214c5525fe1f0a27a3333c232efb6737530159948e96844b4764289056063d25f5afaab81de6b37747e2f1902933357bc2bcd05cb5c18adfc550d1d118306678d3b6230d7d88e76810ac505ad25862083d36cf1fa549e248accf372691ef5d25755f99f31a9191e76a5a3783d85fc0ec37b509b3f83efedc1323e587f9634eff09c4b5d0d857631c46f1da2cb6078eaebb2cc79ec76e0665285612929293d0abf0be3414fd0f5e2dd3c0473e30c955ac8c5e2f9aa2a831a0cb916b4498aaefc226ab063320fd0f7e0b97f93491478752e3b829936d714ac2e661e86cee268e2f77417646dfdd67c75cf81d0af43aa0388476b304c908b187c696e27e359df7abd43578c352e1def53b92b151610bada481f8a448223a41806ffd14330a3cd2ea7611e62d1897233e2dae60787ae42558e428556b3109440b630bf3ef0bbdb3ca574c47db1093137a37f82258b9977dd63d43978f4659f02621476be6898424d5000e65930341e5de7ea7cf39a933edb05ec7e849b0cfa0802141c5c7e6ee104aa7e1f68d48fe0db8bbd41f1416db4cf4252b27c1b9d168d85e8628157c1cad844f7ee29ed6';

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, phone_number, location, date_of_birth, bio } = req.body;
    
    // Hardcoded user data
    const hardcodedUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      phone_number: '1234567890',
      location: 'Test Location',
      date_of_birth: '2000-01-01',
      bio: 'Test Bio'
    };

    // Generate token
    const token = jwt.sign(
      { id: hardcodedUser.id, username: hardcodedUser.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: hardcodedUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hardcoded credentials
    const hardcodedUsername = 'testuser';
    const hardcodedPassword = 'password';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      // Hardcoded user data
      const hardcodedUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        phone_number: '1234567890',
        location: 'Test Location',
        date_of_birth: '2000-01-01',
        bio: 'Test Bio'
      };

      // Generate token
      const token = jwt.sign(
        { id: hardcodedUser.id, username: hardcodedUser.username },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: hardcodedUser
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Protected route example
app.get('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, username, email, phone_number, location, date_of_birth, bio FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 