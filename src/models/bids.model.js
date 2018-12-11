// bids-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const bids = new Schema({
    current_price: { type: Number, required: true},
    bidder: { type: String, required: false},
    product_id: { type: String, required: false}
  }, {
    timestamps: true
  });

  return mongooseClient.model('bids', bids);
};
