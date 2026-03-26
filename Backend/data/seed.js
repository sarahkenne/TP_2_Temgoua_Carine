require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/userModel");

async function seed() {
  try {
    await connectDB();

    const count = await User.countDocuments();

    if (count === 0) {
      await User.insertMany([
        {
          name: "Alice Martin",
          email: "alice@example.com",
          role: "admin",
          createdAt: "2024-01-15",
        },
        {
          name: "Jean Dupont",
          email: "jean@example.com",
          role: "user",
          createdAt: "2024-02-01",
        },
        {
          name: "Sophie Bernard",
          email: "sophie@example.com",
          role: "user",
          createdAt: "2024-02-10",
        },
      ]);
      console.log("3 utilisateurs insérés");
    } else {
      console.log("La collection contient déjà des utilisateurs");
    }

    await mongoose.connection.close();
    console.log("Connexion fermée");
  } catch (error) {
    console.error("Seed error:", error.message);
    await mongoose.connection.close();
  }
}

seed();