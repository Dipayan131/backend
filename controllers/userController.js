const User = require('../models/User');
const PointHistory = require('../models/PointHistory');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Claim random points
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    // Update user points
    const user = await User.findById(userId);
    user.points += points;
    await user.save();

    // Add to point history
    const pointHistory = new PointHistory({ userId, points });
    await pointHistory.save();

    res.json({ message: `${points} points awarded to ${user.name}`, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Point History
exports.getPointHistory = async (req, res) => {
  try {
    const history = await PointHistory.find().populate('userId').sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
