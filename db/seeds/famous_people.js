exports.seed = function(knex, Promise) {
  return knex('famous_people').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('famous_people').insert({id: 1, first_name: 'Abraham', last_name: 'Lincoln', birthdate: '1809-02-12'}),
        knex('famous_people').insert({id: 2, first_name: 'Mahatma', last_name: 'Gandhi', birthdate: '1869-10-02'}),
        knex('famous_people').insert({id: 3, first_name: 'Paul', last_name: 'Rudd', birthdate: '1969-04-06'}),
      ]);
    });
};
