const sumRequestHandler = (req, res) => {
  console.log("in sumRequestHandler", req.url, req.method);
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    const result = Number(bodyObj.first) + Number(bodyObj.second);
    res.setHeader("Content-Type", "text/html");
    res.write(`<html>
            <head>
            <title> result </title>
            <body> 
            <h1> you sum is ${result}</h1>
            <a href="/"> go to home</a>
            </body>
            </head>
            </html>
            `);
    return res.end();
  });
};

exports.sumRequestHandler = sumRequestHandler;
