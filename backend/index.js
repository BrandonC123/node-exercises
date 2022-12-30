const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));
const Entry = require("./models/entry.js");
const { nextTick } = require("process");
require("dotenv").config();

// const API_BASE_URL = "http://localhost:3001/api";

app.get("/", (request, response) => {
    response.send("<h1>Phone Book Entries Backend</h1>");
});

app.get(`/api/persons`, (request, response) => {
    Entry.find({}).then((entries) => {
        response.json(entries);
    });
});

app.get("/info", (request, response) => {
    const date = new Date();
    response.send(`Phonebook has info for ${entries.length} people <br/>
    ${date}`);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const index = entries.map(({ id }) => id).indexOf(id);

    if (index !== -1) {
        response.json(entries[index]);
        console.log(index);
    } else {
        return response.status(404).json({ error: "ID not found" });
    }
});

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    Entry.findByIdAndRemove(id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    const newEntry = Entry({
        name: body.name,
        number: body.number,
    });
    newEntry.save().then((savedEntry) => {
        response.json(savedEntry);
    });
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
