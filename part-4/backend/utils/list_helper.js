const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
};

const getTotalLikes = (blogs) => {
    let total = 0;
    blogs.forEach((blog) => {
        total += blog.likes;
    });
    return total;
};

const getFavoriteBlog = (blogs) => {
    blogs.sort((a, b) => (a.likes > b.likes ? 1 : b.likes > a.likes ? -1 : 0));
    return blogs[blogs.length - 1];
};

const getMostBlogs = (blogs) => {
    let tempList = [];
    for (let i = 0; i < blogs.length; i++) {
        let tempCount = 0;
        for (let j = 0; j < blogs.length; j++) {
            if (blogs[i].author === blogs[j].author) {
                tempCount++;
            }
        }
        tempList.push({ author: blogs[i].author, blogs: tempCount });
    }
    tempList.sort((a, b) =>
        a.count > b.count ? 1 : b.count > a.count ? -1 : 0
    );
    return tempList[tempList.length - 1];
};

module.exports = { dummy, getTotalLikes, getFavoriteBlog, getMostBlogs };
