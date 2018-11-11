/*
 * Node.JS Master Class Homework Assignment #1
 * Primary file for the "Hello world" API
 *
 */


// Dependencies
const handlers = require('./handlers');
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

function serverInit(req, res) {
  // Get te URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Init the StringDecoder and get the payload, if any
  const decoder = new stringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    // Set handler if it is defined
    let handler =
      typeof(handlers.router[trimmedPath]) !== 'undefined' ?
      handlers.router[trimmedPath] :
      handlers.handlers.notFound;

    // Evaluate if the required conditions are met
    // for returning a welcome message in JSON format
    const isPost = method === 'post';
    const hasPayload = buffer.length > 0;
    const isHello = trimmedPath === 'hello';

    // Set the data to empty string as the default
    let data = '';

    if (isHello) {
      if (isPost && hasPayload) {
        data = {'message': 'Thanks for your valuable payload'};

      // Change the response to "204 No Content" for the request to
      // the 'hello' route but which is not 'POST' or has no payload.
      } else {
        handler = handlers.handlers.noContent;
      }
    }

    // Handle the request.
    handler(data, (statusCode, payload) => {
      // Use the status code called back by the handler or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      let payloadString = "\n";

      if (typeof(payload) == 'object') {

        // We have a json and responding accordingly
        payloadString = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
      }

      res.writeHead(statusCode);
      res.end(payloadString)

      console.log('Returning this response: ', statusCode, payloadString);
    });
  });
}

// Instantiating the HTTP server
const httpServer = http.createServer((req, res) => {
  serverInit(req, res);
});

// Start the server and have it listen on port 8000
httpServer.listen(8000, function() {
  console.log('The server is listening on port 8000');
});
