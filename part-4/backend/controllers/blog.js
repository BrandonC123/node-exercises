const blogRouter = require("express").Router();
const Blog = require("../models/blog.js");
const { info } = require("../utils/logger.js");

blogRouter.get("", (request, response) => {
    Blog.find({})
        .then((blogs) => {
            response.json(blogs);
        })
        .catch((error) => {
            console.error(error);
        });
});

blogRouter.post("", (request, response, next) => {
    const blog = new Blog(request.body);
    blog.save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = blogRouter;
