const http = require("http");
const fs = require("fs");
const { URLSearchParams } = require("url");

const server = http.createServer((req, res) => {
  // ---------- HOME ----------
  if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Coding</title></head>");
    res.write("<body><h1>Welcome to Home page</h1>");
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" name="name" placeholder="Enter your name"><br><br>');
    res.write('<label>Gender:</label>');
    res.write('<input type="radio" id="male" name="gender" value="male">');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="female" name="gender" value="female">');
    res.write('<label for="female">Female</label><br><br>');
    res.write('<button type="submit">Submit</button>');
    res.write("</form></body></html>");
    return res.end();
  }

  // ---------- FORM SUBMISSION ----------
  else if (req.method === "POST" && req.url.toLowerCase() === "/submit-details") {
    const body = [];

    // 1. Collect data chunks
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // 2. All data received
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // "name=Sanju&gender=male"
      const params = new URLSearchParams(parsedBody);   // parse into key-value
      const formData = {};
      for (const [key, value] of params) {
        formData[key] = value;
      }

      console.log("User input:", formData);

      // 3. Save to file
      fs.writeFile("user-details.txt", JSON.stringify(formData, null, 2), (err) => {
        if (err) console.error("Write error:", err);
      });

      // 4. Redirect home
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });

    return; // IMPORTANT: don't fall through
  }

  // ---------- FALLBACK (404) ----------
  else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<html><body><h1>404 — Like, Share, Subscribe!</h1></body></html>");
    return res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server running on address http://localhost:${PORT}`);
});