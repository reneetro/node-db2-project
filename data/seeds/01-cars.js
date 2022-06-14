// STRETCH
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('cars').truncate()
    await knex('cars').insert([
      {vin: '11111111111111111', make: 'Honda', model:'Fit', milage: 123456, title: 'yes', transmission: 'automatic'},
      {vin: '22222222222222222', make: 'Lexus', model:'LS600', milage: 123456},
    ]);
  };