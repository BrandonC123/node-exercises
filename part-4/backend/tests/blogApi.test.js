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
    test("blogs have valid id", async () => {
        const allBlogs = await apiHelper.getAllBlogs();
        expect(allBlogs[0]._id).toBeDefined();
    });
});

describe("route testing - POST", () => {
    test("a valid blog object is posted", async () => {
        const newBlog = {
            title: "Brandon's new blog",
            author: "Brandon Chu",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 10,
        };
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        const allBlogs = await apiHelper.getAllBlogs();
        expect(allBlogs).toHaveLength(apiHelper.blogs.length + 1);
        expect(allBlogs[apiHelper.blogs.length].title).toBe(
            "Brandon's new blog"
        );
    });
    test("verifies missing 'likes' property defaults to 0", async () => {
        const missingLike = {
            title: "Brandon's new blog",
            author: "Brandon Chu",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        };
        await api
            .post("/api/blogs")
            .send(missingLike)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        const allBlogs = await apiHelper.getAllBlogs();
        expect(allBlogs[apiHelper.blogs.length].likes).toBe(0);
    });
    test("if title/url is missing responds with error 400", async () => {
        const missingTitle = {
            author: "Brandon Chu",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 10,
        };
        await api.post("/api/blogs").send(missingTitle).expect(400);
    });
});
