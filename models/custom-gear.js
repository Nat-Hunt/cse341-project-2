const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gearSchema = new Schema({
  name: String,
  cost: Number,
  costType: {
    type: String,
    enum: ["cp", "sp", "ep", "gp", "pp"],
  },
  weight: Number,
  description: String,
});

module.exports = mongoose.model("CustomGear", gearSchema);
