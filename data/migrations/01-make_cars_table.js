exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.varchar('vin').unique().notNullable();
    tbl.varchar('make', 128).notNullable();
    tbl.varchar('model', 128).notNullable();
    tbl.numeric('milage').notNullable();
    tbl.varchar('title', 128);
    tbl.varchar('transmission');
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.dropTableIfExists('cars')
};
