require("dotenv").config();
const express = require("express");
const authRoutes = require("./src/routes/authRoute");
const cookieParser = require("cookie-parser");
const corsOptions = require("./src/middlewares/corsMiddleware");
const PORT = 5000;

const app = express();

//MiddleWare
app.use(express.json());
app.use(corsOptions);
app.use(cookieParser());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
