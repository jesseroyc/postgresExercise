exports.up = (knex, Promise) => {
  return knex.schema.createTable('famous_people', (table) => {
    table.increments('id');
    table.string('first_name').unique().notNullable();
    table.string('last_name').notNullable();
    table.string('birthdate').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('famous_people');
};