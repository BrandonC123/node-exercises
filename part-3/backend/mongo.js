const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log(
        "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://brandonchu:${password}@cluster0.dl8uaso.mongodb.net/phonebook?retryWrites=true&w=majority`;

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
});
const Entry = mongoose.model("Entry", entrySchema);

mongoose
    .connect(url)
    .then(() => {
        console.log("db connnected");
        // Print all entries
        if (process.argv.length === 3) {
            Entry.find({}).then((result) => {
                console.log("Phonebook Entries:");
                result.forEach((entry) => {
                    console.log(entry.name, entry.number);
                });
                mongoose.connection.close();
            });
        } else if (process.argv.length === 5) {
            // Add new entry w/ parameters
            const newEntry = new Entry({
                name: process.argv[3],
                number: process.argv[4],
            });
            newEntry.save().then(() => {
                console.log(
                    `Added ${process.argv[3]} Number: ${process.argv[4]} to Phonebook`
                );
                mongoose.connection.close();
            });
        }
    })
    .catch((err) => console.log(err));
