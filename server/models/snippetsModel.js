const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  code: { type: String }
}, {
  timestamps: true // Tell us when the snippet was created and or updated
});

const Snippet = mongoose.model("snippet", snippetSchema);

module.exports = Snippet;