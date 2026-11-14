// simple node js server
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Coding</title></head>");
    res.write("<body> <h1>Welcome to Home page</h1>");
    res.write('<form action="/submit-details" method="POST">');
    res.write(
      '<input type="text" id="name" name="name" placeholder="Enter your name"><br><br>',
    );
    res.write('<label for="gender">Gender:</label>');
    res.write('<input type="radio" id="male" name="gender" value="male">');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="female" name="gender" value="female">');
    res.write('<label for="female">Female</label><br><br>');
    res.write('<button type="submit">Submit</button>');
    res.write("</form>");
    res.write("</body>");
    return res.end();
  } else if (
    req.method == "POST" &&
    req.url.toLowerCase() === "/submit-details"
  ) {
    fs.writeFileSync("user-details.txt", "Hii my name is Sanju Dayal");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Complete Coding</title></head>");
  res.write("<body> <h1>like share subscribe</h1></body>");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});
