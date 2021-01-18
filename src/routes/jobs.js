const express = require('express');
const router = express.Router();

/**
 * @swagger
 *
 * /jobs:
 *   get:
 *     produces:
 *       - application/json
 *     responses:
 *      '200':
 *        description: jobs returned
 */
router.get('/', function (req, res) {
  res.json({foo: 'bar'});
});

module.exports = router;
