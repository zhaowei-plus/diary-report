'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    userName: {
      type: String,
      required: true,
      unique: true, // 唯一的名称
    },
    password: {
      type: String,
      required: true,
    },
  });

  return mongoose.model('User', UserSchema);
};
