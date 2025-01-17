const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler-middleware");
const connectDB = require("./database/connectDB");

// SUB - ROUTER REQUIREMENTS
const userRouter = require("./routes/user-routes");
const courseRouter = require("./routes/course-routes");
const reviewRouter = require("./routes/review-routes");
const messageRouter = require("./routes/message-routes");




dotenv.config();
PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
    console.log("NODE_ENV", process.env.NODE_ENV);
    app.use(cors({
        origin: [
            "http://localhost:5173"
        ]
    }));
}

app.use("/courses", courseRouter);
app.use("/users", userRouter);
app.use("/reviews", reviewRouter);
app.use("/messages", messageRouter)

app.use(errorHandler);

app.use(express.static("../react-client/dist"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../react-client/dist/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
