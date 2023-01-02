const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));
const Entry = require("./models/entry.js");
require("dotenv").config();

// const API_BASE_URL = "http://localhost:3001/api";

app.get("/", (request, response) => {
    response.send("<h1>Phone Book Entries Backend</h1>");
});

app.get("/api/persons", (request, response) => {
    Entry.find({}).then((entries) => {
        response.json(entries);
    });
});

app.get("/info", (request, response) => {
    const date = new Date();
    Entry.find({}).then((entries) => {
        response.send(`Phonebook has info for ${entries.length} people <br/>
    ${date}`);
    });
});

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    Entry.findById(id)
        .then((entry) => {
            response.json(entry);
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    Entry.findByIdAndRemove(id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;
    const newEntry = Entry({
        name: body.name,
        number: body.number,
    });
    newEntry
        .save()
        .then((savedEntry) => {
            response.json(savedEntry);
        })
        .catch((error) => {
            next(error);
        });
});

app.put("/api/persons/:id", (request, response, next) => {
    const id = request.params.id;
    const newEntry = request.body;

    Entry.findByIdAndUpdate(id, newEntry, {
        new: true,
        runValidators: true,
        context: "query",
    })
        .then((updatedEntry) => {
            response.json(updatedEntry);
        })
        .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).send({
            error: `${error.errors.number.properties.message} `,
        });
    }
    next(error);
};
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
