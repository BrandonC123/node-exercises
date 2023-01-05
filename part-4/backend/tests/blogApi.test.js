const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../App.js");
const Blog = require("../models/blog.js");
const apiHelper = require("./blogApiHelper.js");
const api = supertest(app);

beforeEach(async () => {
    await apiHelper.initializeDB();
});

describe("route testing - GET", () => {
    test("gets all blogs", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });
});
