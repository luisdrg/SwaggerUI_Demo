const express = require('express');
const router = express.Router();

// Imagine is coming from a database and is not hardcoded
let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 4, name: "Dana", email: "dana@example.com" },
    { id: 5, name: "Eve", email: "eve@example.com" },
];

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

// Get a single user by id
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.json(user);
});

// Create a new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).send('Name and email are required.');

    const user = {
        id: users[users.length - 1].id + 1, // Increment ID based on the last user's ID
        name,
        email,
    };
    users.push(user);
    res.status(201).send(user);
});

// Update a user
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.send(user);
});

// Delete a user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('The user with the given ID was not found.');

    const [deletedUser] = users.splice(userIndex, 1);
    res.send(deletedUser);
});

module.exports = router;