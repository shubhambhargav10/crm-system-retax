// const {Router} = require('express');
// const express = require('express')
// const { ClientModel } = require('../models/ClientModels');

// const clientRouter = Router();

// clientRouter.use(express.json());

// clientRouter.get('/', async (req, res)=>{
//     try {
//         const allClients = await ClientModel.find();
//         res.status(200).json(allClients);
//     }
//     catch (err) {
//         res.status(500).json('internal server error ',err)
//     }
// })

// clientRouter.post('/add', async (req, res) => {
//     const clientDetails =  req.body;
//     try {
//         const clientToSave = new ClientModel(clientDetails);
//         await clientToSave.save();
//         res.status(200).json('data added successfully')
//     }
//     catch (err) {
//         res.status(500).json('internal server error', err)
//     }
// })


// module.exports = {clientRouter}

const { Router } = require('express');
const express = require('express');
const { ClientModel } = require('../models/ClientModels');
const { authentication } = require('../middlewares/authentication'); // Import the authentication middleware

const clientRouter = Router();

clientRouter.use(express.json());

clientRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://crm-system-retax-2bue.vercel.app');
 
  next();
});


clientRouter.get('/', async (req, res) => {
  try {
    const allClients = await ClientModel.find();
    res.status(200).json(allClients);
  } catch (err) {
    res.status(500).json('internal server error ', err);
  }
});


clientRouter.post('/add', authentication, async (req, res) => {
  const clientDetails = req.body;
  try {
    const clientToSave = new ClientModel(clientDetails);
    await clientToSave.save();
    res.status(200).json('data added successfully');
  } catch (err) {
    res.status(500).json('internal server error', err);
  }
});

module.exports = { clientRouter };
