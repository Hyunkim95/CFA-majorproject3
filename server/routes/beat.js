const express = require('express'),
      router = new express.Router(),
      formidable = require('formidable'),
      Beat = require('../models/beat'),
      fs = require('fs')


router.get('/beats', (req,res) =>{
  Beat.find({ purchased: false })
    .then((beats)=>{
      res.send(beats)
    })
})

router.get('/beats/:id', function(req,res){
  Beat.findById({_id: req.params.id})
    .then((beat)=>{
      res.setHeader('Content-Type', 'audio/mpeg')
      res.send(beat.file)
    })
})

router.post('/beats/:id/edit/', function(req,res){
  Beat.findOneAndUpdate({ _id: req.params.id }, req.query, {
    new: true
  })
  .then((beat) => {
    console.log(beat)
  })
})

router.get('/beats/user/:id/', function(req,res){
  Beat.find({ purchaser: req.params.id})
    .then((beats) => {
      res.send(beats)
    })
})


router.post('/beat', function(req, res, next) {
  let form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, file) {

    console.log(fields)

    if (err) {
      res.sendStatus(400);
      console.log(err)
      return;
    }

    for(var key in file){
      var infoJSON = file[key]
      fs.readFile(infoJSON.path, function(err, data) {
        if (err) {
          res.sendStatus(400);
          console.log(err)
          return;
        }
        if (data.length === 0) {
          res.sendStatus(400);
          console.log("0")
          return;
        }
        console.log(data.length)
        Beat.create({ title: fields.title, price:fields.price, file: data }, function(error) {
          if(err) {
            console.log('Upload failed...');
            return;
          }
          console.log('Upload successful!');
          return;
        });
      });
    }
  });

});


module.exports = router;
