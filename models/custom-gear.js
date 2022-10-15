const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gearSchema = new Schema({
  name: String,
  cost: Number,
  costType: String,
  weight: Number,
  description: String,
});

module.exports = mongoose.model("CustomGear", gearSchema);
