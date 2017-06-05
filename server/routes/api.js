const express = require('express'),
      router = new express.Router(),
      formidable = require('formidable'),
      Beat = require('../models/beat')

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

//
// router.post('/beat/:id', (req, res) => {
//
// })

module.exports = router;
