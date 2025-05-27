const shortid = require('shortid');
const Url = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ 
                error: 'URL is required' 
            });
        }

        const shortID = shortid();  // Note the capitalization of ID
        
        const newUrl = await Url.create({
            redirectUrl: url,
            shortId: shortID,
            visitHistory: []
        });

        return res.status(201).json({ 
            id: shortID,
            shortUrl: `http://localhost:3000/${shortID}`
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Redirect route
async function handleRedirect(req, res) {
    try {
        const { shortId } = req.params;
        const entry = await Url.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true }  // Return the updated document
        );

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirect,
    handleGetAnalytics
};