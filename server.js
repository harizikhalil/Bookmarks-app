const express = require("express");
const connectDB = require("./config/connectDB");
const bookmarkRoute = require("./routes/bookmark-route");
const app = express();
//Connect Database
connectDB();
app.use(express.json());

//route
app.use("/api/bookmark", bookmarkRoute);

//running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
