// DO YOUR MAGIC
const express = require('express');

const {
    checkVinNumberValid, 
    checkVinNumberUnique, 
    checkCarPayload, 
    checkCarId
} = require('./cars-middleware');

const Car = require('./cars-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Car.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => next(err));
})

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car);
})

router.post('/', checkVinNumberUnique, checkVinNumberValid, checkCarPayload, (req, res, next)=>{
    Car.create(req.car)
        .then(car => {
            res.status(201).json(car)
        })
        .catch(err => next(err));
})

module.exports = router;