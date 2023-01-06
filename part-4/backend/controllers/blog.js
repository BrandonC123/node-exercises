const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const { info } = require("../utils/logger.js");

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);
    try {
        const savedNote = await blog.save();
        response.status(201).json(savedNote);
    } catch (error) {
        response.status(400).end();
    }
});

module.exports = blogRouter;
