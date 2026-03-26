require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const usersRoutes = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});