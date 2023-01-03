const express = require("express");
const app = express();
const config = require("./utils/config.js");
const cors = require("cors");
const { info } = require("./utils/logger.js");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware.js");
const blogRouter = require("./controllers/blog.js");

app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use(cors());
app.use(middleware.requestLogger);

mongoose.connect(config.MONGODB_URI).then(() => {
    info("db connected");
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
