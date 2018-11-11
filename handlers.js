// Define the handlers
const handlers = {};

// Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};

handlers.hello = (data, callback) => {
  callback(200, data);
};

handlers.noContent = (data, callback) => {
  callback(204);
};

// Define a request router
const router = {
  'hello': handlers.hello,
};

module.exports = {
  'router': router,
  'handlers': handlers
};
