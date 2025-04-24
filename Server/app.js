const express = require("express");
const app = express();
const cors = require("cors");

// MongoDB config & models
require('./Config/config');
require('./Models/moviemodel');
require('./Models/reviews');  // ✅ Use the correct case

// Routes
const UserRoute = require('./Routes/userRoute');
const RecommendedRoute = require('./Routes/recommendedRoute');
const reviewRoutes = require('./Routes/reviewRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/", UserRoute);
app.use('/reviews', reviewRoutes);  // ✅ Review route
app.use("/recommendation", RecommendedRoute);
app.use("/thriller", RecommendedRoute);


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
