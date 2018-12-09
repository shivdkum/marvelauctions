// postitems-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const postitems = new Schema({
    product_name: { type: String, required: true },
    current_price: { type: Number, required: true},
    start_time: { type: Date, required: true},
    end_time: { type: Date, required: true},
    seller_username: { type: String, required: false},
    top_bidder: { type: String, required: false}
  }, {
    timestamps: true
  });

  return mongooseClient.model('postitems', postitems);
};
