const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));
app.use(bodyParser.urlencoded());
const testData = require('./testData');
const testData2 = require('./testData2');
require('dotenv').config();
app.use(bodyParser.json());

var upload = multer({dest: './images/'});
const censoredWords = [
  'album',
  'cover',
  'vinyl',
  '[vinyl]',
  'usa',
  'import',
  'lp',
  '[lp]',
  'cd',
  '[cd]',
  'soundtrack',
  '(album)',
  '[german import]',
];
app.post('/request', upload.single('file'), (req, res) => {
  console.log('file', req.file);
  console.log('body', req.body);
  const image = './images/' + req.file.filename;
  var bitmap = fs.readFileSync(image);
  const image64 = new Buffer(bitmap).toString('base64');
  // const image64 = testData.testData.toString('base64');
  // const image64 = testData2.testData.toString('base64');
  const googleBody = JSON.stringify({
    requests: [
      {
        features: [
          {
            type: 'WEB_DETECTION',
            maxResults: 1,
          },
        ],
        image: {
          content: image64,
        },
      },
    ],
  });
  const googleResponse = fetch(
    // eslint-disable-next-line quotes
    `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_KEY}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: googleBody,
    },
  )
    .then(rawResponse => {
      return rawResponse.json();
    })
    .then(googleResponseJson => {
      const bestGuess = JSON.stringify(
        googleResponseJson.responses[0].webDetection.bestGuessLabels[0].label,
      );
      let guessArray = bestGuess.split(' ');
      console.log(
        JSON.stringify(
          googleResponseJson.responses[0].webDetection.bestGuessLabels,
        ),
      );
      let safeArray = [];
      for (var i in guessArray) {
        let safe = true;
        if (censoredWords.indexOf(guessArray[i]) > -1) {
          safe = false;
        }
        if (safe) {
          safeArray.push(guessArray[i]);
        }
      }
      console.log('safeArray', safeArray);
      const discogsSearchResponse = fetch(
        // eslint-disable-next-line quotes
        `https://api.discogs.com/database/search?q=${encodeURIComponent(
          bestGuess,
        )}&type=release&key=${process.env.DISCOG_KEY}&secret=${
          process.env.DISCOG_SECRET
        }`,
      )
        .then(rawResponse => {
          return rawResponse.json();
        })
        .then(discogsSearchResponseJson => {
          const discogsReleaseResponse = fetch(
            // eslint-disable-next-line quotes
            `https://api.discogs.com/releases/${discogsSearchResponseJson.results[0].id}?key=${process.env.DISCOG_KEY}&secret=${process.env.DISCOG_SECRET}`,
          )
            .then(rawResponse => {
              return rawResponse.json();
            })
            .then(discogsReleaseResponseJson => {
              // console.log(discogsReleaseResponseJson);
              res.send(discogsReleaseResponseJson);
            });
        });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
