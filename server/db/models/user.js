const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  subscriptions: Array,
  queue: [{ type: Schema.Types.ObjectId, ref: 'Episode' }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;