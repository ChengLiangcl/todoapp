exports.config = {
  app_name: [process.env.NEW_RELIC_APP_NAME || 'Logger-Platform'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY || 'YOUR_DEFAULT_KEY',
  logging: {
    level: 'info',
    forward: true,
    enabled: true,
  },
  allow_all_headers: true,
  attributes: {
    exclude: ['request.headers.cookie', 'request.headers.authorization'],
  },
  application_logging: {
    forwarding: {
      enabled: true,
    },
    metrics: {
      enabled: true,
    },
    local_decorating: {
      enabled: true,
    },
  },
};
