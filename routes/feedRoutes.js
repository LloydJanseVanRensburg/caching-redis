const express = require('express');
const { FeedControllers } = require('../controllers/feedControllers');
const { AuthMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', AuthMiddleware.auth, FeedControllers.getUserFeed);

module.exports = router;
