const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const info = {
    'node-version': process.version,
    memory: process.memoryUsage(),
    pid: process.pid,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    appName: process.env.name,
    appVersion: process.env.npm_package_version,
    hostname: process.env.HOSTNAME,
  };

  res.status(200).json(info);
});

module.exports = router;
