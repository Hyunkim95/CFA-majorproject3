const express = require('express'),
      router = new express.Router(),
      formidable = require('formidable'),
      Beat = require('../models/beat'),
      fs = require('fs')


router.get('/beats', (req,res) =>{
  Beat.find()
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

router.post('/beat', function(req, res, next) {
  let form = new formidable.IncomingForm();

  console.log(form)
  form.parse(req, function(err, fields, file) {


    if (err) {
      res.status(400).send('Error parsing form', err);
      return;
    }

    for(var key in file){
      var infoJSON = file[key]
      fs.readFile(infoJSON.path, function(err, data) {
        if (err) {
          res.status(400).send('Error parsing form', err);
          return;
        }
        if (data.length === 0) {
          res.status(400).send('No file provided');
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
        res.send("Successfu")
      });
    }
  });

});


module.exports = router;
