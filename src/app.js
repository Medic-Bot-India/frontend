const cors = require('cors')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
const express = require('express')
const passport = require('passport');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
//const db = require('./models');
//const Role = db.role;
// const geocode = require('./utils/geocode')
//const mongoClient = require('mongodb').MongoClient;
// const hbs = require('hbs')
// const path = require('path')
// const express = require('express')
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')


const app= express();
const port = process.env.PORT || 5000
// console.log(__dirname)


const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// console.log(viewPath)
// console.log(publicDirectory)
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))
app.use(cors())
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '.../build')))
}
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)

const connection_uri = 'mongodb+srv://kvnp:eB5jtcsFvsRlT6jR@cluster0.pktvg.mongodb.net/healfvr?retryWrites=true&w=majority'

mongoose.connect(connection_uri, {useNewurlParser:true, useUnifiedTopology:true })
.then((res) => {
    app.listen(process.env.PORT, () => console.log("dbserver is live"))
})
.catch(err => console.log(err))

function verifyJWT(req, res, next) {
    const token = req. headers["x-access-token"]?.split(' ')[1]
    if(token) {
        jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
            if(err) return res.json({ isLoggedIn: false, message: "Failed to authenticate"})
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()
        })
    }
    else{
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}

app.post("/register", async (req,res) => {
    const user = req.body;
    const takenUsername = await User.findOne({username: user.username})
    const takenEmail = await User.findOne({email: user.email})
    if(takenUsername || takenEmail) {
        res.json({message: "Username or email has already been taken"})
    } else {
        if (user.password === user.confirmPassword) {
            user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({username: user.username.toLowerCase(), email: user.email.toLowerCase(), password: user.password})
        dbUser.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({ message: "User was registered successfully!" });
        })
        res.render('login', {
            message: 'Registration Complete. Please login to continue.',
            messageClass: 'alert-success'
        });
        } else {
            res.render('register', {
                message: 'Password does not match.',
                messageClass: 'alert-danger'
            });
        }
        
    }
})

app.post("/login", (req,res) => {
    const userLogin = req.body;
    //const x= (User.findOne({username: userLogin.email}) ||  User.findOne({email: user.email}) )
    const x= (User.findOne({username: userLogin.username}))
    x.then(dbUser => {
        if(!dbUser) {
            return res.json({message:"Invalid username or password"})
        }
        bcrypt.compare(userLogin.password, dbUser.password)
        .then( isCorrect => {
            if(isCorrect) {
                /*
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username,
                } 
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if(err) return res.json({message: err})
                        return res.json({errmessage: "Sucess", token: "Bearer " + token})
                    }
                )*/
                    
                res.render('index', {
                    username: userLogin.username
                });
            }
            else{
                return res.render('login', {
                    message: 'Invalid username or password.',
                    messageClass: 'alert-danger'
                });
            }
        })
    })
})

app.get("/getUsername", verifyJWT, (req,res) => {
    res.json({isLoggedIn: true, username: req.user.username})
})

app.get('', (req,res)=>{
    res.render('index',{
        title: 'MedicBot',
        name: 'Prateek',
    })
})
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/history', (req,res)=>{
    res.render('history',{
        title: 'history',
        name: 'Prateek',
    })
})
app.get('/account', (req,res)=>{
    res.render('account',{
        title: 'history',
        name: 'Prateek',
    })
})

app.get('/docs', (req,res)=>{
    res.render('docs',{
        title: 'docs',
        name: 'Prateek',
    })
})

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Prateek',
//         errorMessage: 'Help article not found.'
//     })
// })










app.listen(port,()=>{
    console.log('app is running now')
})


