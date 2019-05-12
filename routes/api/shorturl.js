const express = require('express');
const router = express.Router();
const url = require('../../models/url');
const dns = require('dns');

router.post('/new', (req, res) => {
  //Get input from the request body
  let input = req.body.input;

  //Search the database to see if the input url already exists
  url.find({url: input}, function(err, document) {
    
    if (err) {
      console.error(err);
    }
    
    else {
      //If the input url doesn't exist, check if it's valid
      if (document.length == 0) {
        dns.lookup(input, err => {
          //Invalid url - return error
          if (err) {
            console.error(`invalid URL: ${input}`);
            res.json({error: "invalid URL"});
          }
          //Valid url - add to database
          else {
            url.estimatedDocumentCount(function(err, count) {
              if (err) {
                console.error(err);
              }
              let newId = count + 1,
                  newUrl = new url({
                    id: newId,
                    url: input
                  });

              newUrl.save().then(document => {
                console.log("New URL added");
                res.json({
                  original_url: document.url,
                  short_url: document.id
                });
              });
            });
          }
        });
      }
      else {
        console.log(`Input: ${input}, Document: ${document}`);
        res.json({
          original_url: document[0].url,
          short_url: document[0].id
        });
      }
      
    }
  });
    // .then(document => res.json({original_url: document.url, short_url: document.id}));
});

module.exports = router;