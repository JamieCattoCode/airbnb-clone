const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const User = require('./models/User');

const connectionString = process.env.connection_string;
const jwtSecret = process.env.jwt_secret
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());
app.use(cookieParser());

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

    if(!(name && email && password)) {
        res.status(400).json({ message: 'You need to enter a value for all fields.' })
    }

    try {
        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
    
        res.json(newUser);
        
    } catch (error) {
        res.status(422).json(error);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const foundUserDoc = await User.findOne({ email });

    if (foundUserDoc) {
        const passwordOkay = bcrypt.compareSync(password, foundUserDoc.password);
        if (passwordOkay) {
            jwt.sign({
                id: foundUserDoc._id,
                email: foundUserDoc.email,
            }, 
                jwtSecret, 
                {}, 
                (error, token) => {
                    if(error) throw error;
                    res.cookie('userToken', token).json(foundUserDoc);
            });
        } else {
            res.status(422).json('Incorrect password.');
        }
    } else {
        res.json('Not found')
    }
});

app.get('/profile', (req, res) => {
    const { userToken } = req.cookies;
    if (userToken) {
        jwt.verify(userToken, jwtSecret, {}, async (error, userData) => {
            if (error) throw error;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        })
    } else {
        res.status(400).json('No cookie found.')
    }
})

app.listen(4000, () => {
    console.log('App listening on port 4000');
});