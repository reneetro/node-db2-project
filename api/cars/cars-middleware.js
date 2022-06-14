const Car = require('./cars-model');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  Car.getById(req.params.id)
    .then(car => {
      if(car == null) {
        res.status(404).json({ message: `car with id ${req.params.id} is not found` })
        return;
      }
      req.car = car;

      next();
    })
    .catch(err => next(err));
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  let { vin, make, model, mileage, } = req.body
  if(!vin){
    res.status(400).json({ message: 'vin is missing'})
    return;
  }
  if(!make){
    res.status(400).json({ message: 'make is missing'})
    return;
  }
  if(!model){
    res.status(400).json({ message: 'model is missing'})
    return;
  }
  if(!mileage){
    res.status(400).json({ message: 'mileage is missing'})
    return;
  }

  req.car = {
     ...req.body,
     vin: vin.trim(),
     make: make.trim(), 
     model: model.trim(), 
     mileage: mileage
    }

  next();
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vinValidator = require('vin-validator');
  const verified = vinValidator.validate(req.body.vin); 
  if(verified === true) {
    next()
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid`} );
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  if(req.body.vin){
    const exists = await Car.getByVin(req.body.vin)
    if(!exists){
      next();
    } else {
      res.status(400).json({ message: `vin ${req.body.vin} already exists`})
    }
  } else {
    res.status(400).json({ message: 'vin is missing'})
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}