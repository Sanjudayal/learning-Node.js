const { sumRequestHandler } = require("./sum");

const requestHandler = (req, res) => {
  //   console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
            <head>
            <title> calculator </title>
            <body> 
            <h1> welcome to calculator</h1>
            <a href="/calculator"> go to calculator</a>
            </body>
            </head>
            </html>
            `);
    return res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
            <head>
            <title> calculator </title>
            <body> 
            <h1> Sum</h1>
          <form action="/calculate-result" method= "POST">
           <input type='text' placeholder="first number" name="first">
           <input type='text' placeholder="second number" name="second">
           <input type='submit' value= "sum">
          </form>
     
            </body>
            </head>
            </html>
            `);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
            <head>
            <title> error </title>
            <body> 
            <h1> 404 page does not found</h1>
            <a href="/"> go to home</a>
            </body>
            </head>
            </html>
            `);

  return res.end();
};

exports.requestHandler = requestHandler;
