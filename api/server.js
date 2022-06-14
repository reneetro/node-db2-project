const express = require("express")

const server = express()

// DO YOUR MAGIC

const carRouter = require('./cars/cars-router');

server.use(express.json());

server.use('/api/cars', carRouter);

module.exports = server
