const http = require("http");
const submitHandler = require("./user");

const { URLSearchParams } = require("url");

const server = http.createServer(submitHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});
