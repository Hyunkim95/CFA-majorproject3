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

router.get('/beats', (req,res) =>{
  Song.find()
    .then(()=>{
      res.send(songs)
    })
})

router.get('/beats/:id', function(req,res){
  Song.findById({_id: req.params.id})
    .then((song)=>{
      res.setHeader('Content-Type', 'audio/mpeg')
      res.send(song.song_file)
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

    for(key in file){
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
        Song.create({ title: fields.title, price:fields.price, song_file: data }, function(error) {
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
