const sumRequestHandler = (req, res) => {
  console.log("in sumRequestHandler", req.url, req.method);

  return res.end();
};

exports.sumRequestHandler = sumRequestHandler;
