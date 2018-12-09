// auctions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const auctions = new Schema({
    start_time: { type: Date, required: true},
    end_time: { type: Date, required: true},
    user_id: { type: String, required: false}
  }, {
    timestamps: true
  });

  return mongooseClient.model('auctions', auctions);
};
