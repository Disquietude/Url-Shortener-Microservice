const express = require('express');
const router = express.Router();
const short_url = require('../../models/short_url');
const dns = require('dns');
const {URL} = require('url');

router.post('/new', (req, res) => {
  //Get input from the request body
  let input = req.body.input;

  //Search the database to see if the input url already exists
  short_url.find({original_url: input}, function(err, document) {
    
    if (err) {
      console.error(err);
    }
    
    else {
      //If the input url doesn't exist, check if it's valid
      if (document.length == 0) {
        //Try to create a URL object using the input
        try {
          let inputUrl = new URL(input),
              hostname = inputUrl.hostname;

              //Check if the host is valid
              dns.lookup(hostname, err => {
                //Invalid url - return error
                if (err) {
                  console.error(`Invalid URL (dns lookup failed): ${input}`);
                  res.json({error: "invalid URL"});
                }
                //Valid url - add to database
                else {
                  short_url.estimatedDocumentCount(function(err, count) {
                    if (err) {
                      console.error(err);
                    }
                    let shortUrl = count + 1,
                        newUrl = new short_url({
                          short_url: shortUrl,
                          original_url: input
                        });
      
                    newUrl.save().then(document => {
                      console.log(`New URL added: ${input}`);
                      res.json({
                        original_url: document.original_url,
                        short_url: document.short_url
                      });
                    });
                  });
                }
              });
        } 
        catch (error) {
          console.error(error);
          res.json({error: "invalid URL"});
        }
      }
      //Input url already exists in the database
      else {
        console.log(`Existing URL: ${input}`);
        res.json({
          original_url: document[0].original_url,
          short_url: document[0].short_url
        });
      }
    }
  });
    // .then(document => res.json({original_url: document.url, short_url: document.id}));
});

router.get('/:short_url', (req, res) => {
  short_url.find({short_url: req.params.short_url})
    .then(docs => {
      if (docs.length > 0) {
        res.redirect(docs[0].original_url);
      }
      else {
        res.json({
          error: "No short url found for given input"  
        });
      }
    })
    .catch(error => res.status(404).json({error: error}));
});

module.exports = router;