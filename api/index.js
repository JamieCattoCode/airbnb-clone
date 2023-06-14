const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const connectionString = process.env.connection_string;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}));

mongoose.connect(connectionString);

app.get('/test', (req, res) => {
    res.json('Test ok.');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
    });

    res.json(newUser);
})

app.listen(4000, () => {
    console.log('App listening on port 4000');
});