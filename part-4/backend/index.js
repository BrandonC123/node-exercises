const app = require("./App.js");
const http = require("http");
const { info } = require("./utils/logger");
const config = require("./utils/config.js");

const server = http.createServer(app);
server.listen(config.PORT, () => {
    info(`Server is running on http://localhost:${config.PORT}/`);
});
