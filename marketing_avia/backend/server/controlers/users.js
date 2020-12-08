const User = require("../models/users")

module.exports.createUser = (req, res, next) => {
  return User
    .create()
    .then(([user]) => res.json(user))
    .catch(next)
}


module.exports.getUser = (req, res, next) => {
  const { id } = req.params

  return User
    .find(id)
		.then((user) => res.json(user))
		.catch(next)
}


module.exports.updateUser = (req, res) => {
  const { id } = req.params
  const { props } = req.body
  
  return User
    .update(id, props)
		.then(([user]) => res.json(user))
		.catch(next)
}