const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const todoRouter = require("./routes/todo-routes");
const errorHandler = require("./middleware/error-handler-middleware");
const connectDB = require("./database/connectDB");

dotenv.config();
PORT = process.env.PORT | 3000;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  console.log("NODE_ENV", process.env.NODE_ENV);
  app.use(cors({ 
    origin: [
      "http://localhost:4200", 
      "http://localhost:5173"
    ] 
  }));
}

app.use("/todos", todoRouter);

app.use(errorHandler);

app.use(express.static("../react-client/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../react-client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
