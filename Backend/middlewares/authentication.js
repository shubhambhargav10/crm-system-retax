const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();


const authentication = async(req, res, next) =>{
    const token  = req.headers.authorization?.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if(err) {
           return res.status(404).json('login first')
        }
        req.user = decoded.user
        next();
      });
}
module.exports = {authentication}