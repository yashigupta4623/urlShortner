const mongoose = require('mongoose');

// Schema for URL
const urlSchema = new mongoose.Schema({
    redirectUrl: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: [{
        timestamp: { type: Number }
    }]
}, { timestamps: true });

// Model for URL
const Url = mongoose.model('Url', urlSchema);

//  Export the URL model
module.exports = Url;