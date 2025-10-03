// loggerMiddleware.js
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

function loggerMiddleware(req, res, next) {
  const start = Date.now();
  const correlationId = uuidv4();
  const originalJson = res.json.bind(res);

  res.json = (responseBody) => {
    const duration = Date.now() - start;
    const logPayload = {
      timestamp: new Date().toISOString(),
      level: res.statusCode >= 400 ? 'error' : 'info',
      message: `${req.method} ${req.originalUrl}`,
      logId: uuidv4(),
      service: 'TodoService',
      environment: process.env.NODE_ENV || 'development',
      userId: req.user?._id?.toString() || null,
      username: req.user?.username || null,
      payload: req.body || null,
      request: {
        method: req.method,
        url: req.originalUrl,
        query: req.query,
        ip: req.ip,
      },
      mongoQuery: req.mongodbQuery || null,
      response: {
        status: res.statusCode,
        message:
          res.statusCode >= 400 ? responseBody?.message || 'Error' : 'Success',
        durationMs: duration,
      },
    };

    // Fire-and-forget async logging
    (async () => {
      try {
        await fetch('https://log-api.newrelic.com/log/v1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': process.env.NEW_RELIC_LICENSE_KEY,
          },
          body: JSON.stringify([logPayload]),
        });
      } catch (err) {
        throw err;
      }
    })();

    return originalJson(responseBody);
  };

  next();
}

module.exports = loggerMiddleware;
