const express = require('express');
const router = express.Router();

router.get('/keep-alive', async function(req, res, next) {
  if (req.get('X-Appengine-Cron') !== 'true') {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(200);
});

module.exports = router;
