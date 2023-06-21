const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const User = require('./models/User');
const Place = require('./models/Place');

const connectionString = process.env.connection_string;
const jwtSecret = process.env.jwt_secret
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();

app.use(express.json());
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(cookieParser());

const photosMiddleware = multer({ dest: 'uploads' })

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
});

app.post('/logout', (req, res) => {
    res.cookie('userToken', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;

    const newName = 'photo' + Date.now() + '.jpg';
    const destinationPath = __dirname + '/uploads/' + newName;

    await download.image({
        url: link,
        dest: destinationPath
    })

    res.json(newName)
});

app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const fileExtension = parts[parts.length-1]
        const newPath = path + '.' + fileExtension;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const { userToken } = req.cookies;
    const { 
        title, addedPhotos, address, description, perks, extraInfo, checkIn, checkOut, maxGuests 
    } = req.body;
    jwt.verify(userToken, jwtSecret, {}, async (error, userData) => {
        if (error) throw error;
        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests
        });
        res.json(placeDoc);
    });
});

app.get('/user-places', (req, res) => {
    const { userToken } = req.cookies;
    jwt.verify(userToken, jwtSecret, {}, async (error, userData) => {
        if (error) throw error;
        const { id } = userData;
        const placeList = await Place.find({owner: id})
        res.json(placeList);
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.json(place);
});

app.put('/places/:id', (req, res) => {
    const { id: placeId } = req.params;
    const { userToken } = req.cookies;
    const {
        title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,
      } = req.body;

      
    jwt.verify(userToken, jwtSecret, {}, async (error, userData) => {
        if (error) throw error;
        const placeDoc = await Place.findById(placeId)
        if (userData.id === placeDoc.owner.toString()) {
            await Place.findByIdAndUpdate(placeId, {
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests
            });

        }
        res.json(placeDoc);
});
})

app.listen(4000, () => {
    console.log('App listening on port 4000');
});