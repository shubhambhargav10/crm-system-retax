const express = require ('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();
const cors = require('cors');

const {connection} = require('./config/db');
const {UserModel} = require('./models/UserModel');
const { authentication } = require('./middlewares/authentication');
const { clientRouter } = require('./Routes/clientRouter');

const app = express();
app.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://crm-system-retax-2bue.vercel.app');
   
    next();
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://crm-system-retax-2bue.vercel.app/client/add');
   
    next();
  });
app.use(express.json());

app.get('/', async(req, res) =>{
    const allUsers = await UserModel.find();
    try {
        res.status(200).json(allUsers)
    }
    catch (err) {
        res.status(500).json('error', err)
    }
})

app.post('/login', async(req, res) =>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user) return res.status(404).json('please create your account')
    try {
        const  hash = user.password
        bcrypt.compare(password, hash, async function(err, result) {
            if(err) return res.status(500).json('erro in bcrypt')
            if(result)
            {
                var token = jwt.sign({ user: user }, 'shhhh...koi hai!');
                res.status(200).json({token: token, msg:"login successful"})
            }
            else {
                res.status(400).json('invalid credentials')
            }
        })
    }
    catch (err) {
        res.status(500).json(`internal server error due to  ${err.message}`)
    }
})

app.post('/signup', async (req, res)=>{
        const {email,firstName,lastName,password,confirmPassword,gender,address} = req.body;
        if(password!==confirmPassword) {
            return res.status(400).json('passwords do not match');
        }
        const existingUser = await UserModel.findOne({email});
        if(existingUser) 
        {
            return res.status(400).json('this email is already in use');
        }
        try {
            bcrypt.hash(password, 5, async function(err, hash) {
                if(err) {
                   return res.status(500).json('error hashing password')
                }
                else {
                        const newUser = new UserModel({
                            firstName,
                            lastName,
                            email,
                            password: hash,
                            gender,
                            address
                    })
                    try {
                        await newUser.save();
                        return res.status(200).json('Account created successfully')
                    }
                    catch (err) {
                        res.status(500).json('error creating account due to : ' + err.message)
                    }
                    
                }
            });
    }
    catch (err) {
        res.status(500).json(`internal server error due to  ${err.message}`)
    }
})

app.use('/client',authentication, clientRouter)

app.listen(8000, async ()=>{
    try {
        await connection
        console.log('connected to db succesfully');
    }
    catch (err) {
        console.log('error connecting to db due to error: ' + err)
    }
    console.log('active port 8000')
})
