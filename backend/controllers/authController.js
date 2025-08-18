// controllers/authController.js
import User from '../models/User.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (await User.findOne({ username })) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = new User({ username, password });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = await User.findOne({
        username
    });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({
            message: 'Invalid username or password'
        });
    }
    req.session.user = user._id;
    res.json({
        message: 'Login successful'
    });
};