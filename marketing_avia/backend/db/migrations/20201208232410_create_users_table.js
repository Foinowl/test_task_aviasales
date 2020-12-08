
exports.up = function(knex) {
  return knex.schema.createTable("users", (t) => {
    t.increments("id").primary().unsigned()
    t.string("email").unique().nullable().index().defaultTo(null)
    t.boolean("shared").defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
