const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
const entrySchema = new mongoose.Schema({
    name: { type: String, minLength: 3, required: true },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        required: true,
    },
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
