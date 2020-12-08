const knex = require("../../knexfile")
const selectableProps = ["id", "email", "shared"]
// const tableName = "users"

console.log(knex);

// module.exports.create = () => {
// 	return knex.insert({}, selectableProps).into(tableName)
// }

// module.exports.update = (id, props) => {
// 	return knex
// 		.update(props)
// 		.from(tableName)
// 		.where({ id })
// 		.returning(selectableProps)
// }

// module.exports.find = (id) => {
// 	return knex.first(selectableProps).from(tableName).where({ id })
// }
