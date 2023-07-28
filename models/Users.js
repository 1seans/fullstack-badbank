const { default: mongoose } = require('mongoose')
const mongooes = require('mongoose')

const UsersSchema = new mongoose.Schema({
  name:     String,
  email:    String,
  password: String,
  balance: { type: Number, default: 0 },
  transactions: Array,
})

const UsersModel = mongoose.model('users', UsersSchema )
module.exports = UsersModel


