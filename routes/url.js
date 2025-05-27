const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl,handleGetAnalytics, handleRedirect } = require('../controllers/url');

// Generate short URL
router.post('/', handleGenerateNewShortUrl);

// Redirect to original URL
router.get('/:shortId', handleRedirect);

router.get('/analytics/:shortId', handleGetAnalytics)
module.exports = router;