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
  let { vin, make, model, milage, } = req.body
  if(vin.trim() === ''){
    res.status(400).json({ message: 'vin is missing'})
    return;
  }
  if(make.trim() === '' || typeof make !== 'string' ){
    res.status(400).json({ message: 'make is missing'})
    return;
  }
  if(model.trim() === '' || typeof model !== 'string' ){
    res.status(400).json({ message: 'model is missing'})
    return;
  }
  if(milage === '' || typeof milage.parseFloat() !== 'number' ){
    res.status(400).json({ message: 'milage is missing'})
    return;
  }

  req.car = {
     vin: vin.trim(),
     make: make.trim(), 
     model: model.trim(), 
     milage: milage.parseFloat()
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

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const vinNotUnique = Car.getAll().then(cars => {
    cars.filter(car => car.vin === req.body.vin)
  })
  if(vinNotUnique.length >= 1){
    res.status(400).json({ message: `vin ${req.body.vin} already exists`})
    return;
  }
  next();
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}