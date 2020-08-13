const express = require('express');
const router = express.Router();

router.use(require('./task-router'));

module.exports = router;