const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const armorSchema = new Schema({
  name: String,
  armorType: String,
  ac: Number,
  dexBonus: String,
  stealthDis: Boolean,
  cost: Number,
  costType: String,
  weight: Number,
  strengthRqr: Number,
  description: String,
});

module.exports = mongoose.model("CustomArmor", armorSchema);
