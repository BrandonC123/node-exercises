const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));

let entries = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

const API_BASE_URL = "http://localhost:3001/api";

app.get("/", (request, response) => {
    response.send("<h1>Phone Book Entries Backend</h1>");
});

app.get(`/api/persons`, (request, response) => {
    response.json(entries);
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

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const index = entries.map(({ id }) => id).indexOf(id);
    if (index !== -1) {
        entries.filter((entry) => entry.id !== id);
        response.status(204).end();
    } else {
        return response.status(404).json({ error: "ID not found" });
    }
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    console.log(body);
    const id = Math.round(Math.random() * 10000);
    const newEntry = {
        id: id,
        name: body.name,
        number: body.number,
    };
    const index = entries.map(({ name }) => name).indexOf(body.name);

    if (index !== -1) {
        return response.status(404).json({ error: "name must be unqiue" });
    } else if (!body.name) {
        return response.status(404).json({ error: "missing name" });
    } else if (!body.number) {
        return response.status(404).json({ error: "missing number" });
    }
    entries = entries.concat(newEntry);
    response.json(newEntry);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
