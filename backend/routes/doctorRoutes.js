const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor"); // ✅ Make sure Doctor.js file is correct

// ✅ POST: Add a new doctor
router.post("/add", async (req, res) => {
  try {
    const { name, address, lat, lng } = req.body;

    // Create a new doctor instance
    const doctor = new Doctor({
      name,
      address,
      location: {
        type: "Point",
        coordinates: [lng, lat], // Note: [longitude, latitude]
      },
    });

    await doctor.save(); // Save to MongoDB
    res.json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET: Find nearby doctors
router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const doctors = await Doctor.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000, // meters
        },
      },
    });

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
