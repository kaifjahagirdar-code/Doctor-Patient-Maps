const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Create a 2dsphere index for geospatial queries
doctorSchema.index({ location: "2dsphere" });

// ✅ EXPORT the Doctor model
module.exports = mongoose.model("Doctor", doctorSchema);
