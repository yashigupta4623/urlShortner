const express = require('express');
const { connectToDatabase } = require('./connection');
const UrlRoutes = require('./routes/url');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToDatabase("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/', UrlRoutes);  // Changed from '/url' to '/'

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});