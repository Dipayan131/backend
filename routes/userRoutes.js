const express = require('express');
const router = express.Router();
const { getUsers, claimPoints, addUser, getPointHistory } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/claim', claimPoints);
router.post('/add', addUser);
router.get('/history', getPointHistory);

module.exports = router;
