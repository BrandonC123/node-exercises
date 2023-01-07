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

blogRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
    const id = request.params.id;
    const newBlog = request.body;
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
        new: true,
        runValidators: true,
        context: "query",
    });
    response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
