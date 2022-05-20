const mongoose = require("mongoose");

const BisinessDefinition = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: [{}],
  capital: {
    type: Number,
    required: true,
    trim: true,
  },
  conditions: [{}],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("bisinessDefinition", BisinessDefinition);
