const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
});
mongoose
    .connect(url)
    .then(() => {
        console.log("db connected");
    })
    .catch((e) => {
        console.error(e);
    });
module.exports = mongoose.model("Entry", entrySchema);
