// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({

    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: { type: String, required: true },
    role: { type: String,  enum: ['Member', 'Admin'], default: 'Member' }

  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
