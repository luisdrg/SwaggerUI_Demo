const express = require('express');
const app = express();
const PORT = 3000;
const usersRouter = require('./routes/users');

// middleware to parse incoming JSON requests into JavaScript objects. (available in the req.body property)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome! Demo server is running');
});

// Use the users router for all requests to /users
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});