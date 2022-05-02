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

app.post('/googleGuess', upload.single('file'), (req, res) => {
  const image = './images/' + req.file.filename;
  var bitmap = fs.readFileSync(image);
  const image64 = new Buffer(bitmap).toString('base64');
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
      const bestGuess = googleResponseJson.responses[0].webDetection.bestGuessLabels[0].label;
      console.log(`bestGuess: ${bestGuess}`);
      console.log(googleResponseJson.responses[0].webDetection.bestGuessLabels[0].label);
      let guessArray = bestGuess.split(' ');
      let safeArray = [];
      for (var i in guessArray) {
        let safe = true;
        if (censoredWords.indexOf(guessArray[i]) > -1) {
          safe = false;
        }
        if (safe) {
          console.log(`guessArray[i] ${guessArray[i]}`)
          safeArray.push(guessArray[i]);
          console.log(`pre join safeArray: ${safeArray}`)
        }
      }
      const cleanedBestGuess = safeArray.join(' ');
      console.log(`post join safeArray: ${cleanedBestGuess}`)

      res.send({bestGuess: cleanedBestGuess});
    });
});

app.get('/search', (req, res) => {

  console.log(
    `https://api.discogs.com/database/search?q=${encodeURIComponent(req.query.searchTerm)}&type=release&page=${req.query.page}&key=${process.env.DISCOG_KEY}&secret=${process.env.DISCOG_SECRET}`,
  );
  const discogsSearchResponse = fetch(
    // eslint-disable-next-line quotes
    `https://api.discogs.com/database/search?q=${encodeURIComponent(req.query.searchTerm)}&type=release&page=${req.query.page}&key=${process.env.DISCOG_KEY}&secret=${process.env.DISCOG_SECRET}`,
  )
    .then(rawResponse => {
      return rawResponse.json();
    })
    .then(discogsSearchResponseJson => {
      res.send(discogsSearchResponseJson);
      //   const discogsReleaseResponse = fetch(
      //     // eslint-disable-next-line quotes
      //     `https://api.discogs.com/releases/${discogsSearchResponseJson.results[0].id}?key=${process.env.DISCOG_KEY}&secret=${process.env.DISCOG_SECRET}`,
      //   )
      //     .then(rawResponse => {
      //       return rawResponse.json();
      //     })
      //     .then(discogsReleaseResponseJson => {
      //       // console.log(discogsReleaseResponseJson);
      //       res.send(discogsReleaseResponseJson);
      //     });
    });
});

app.get('/getAlbum/:albumId', async (req, res) => {
  const reponse = await fetch(
    `https://api.discogs.com/releases/${req.params.albumId}?key=${process.env.DISCOG_KEY}&secret=${process.env.DISCOG_SECRET}`,
  );
  const jsonResponse = await reponse.json();
  res.send(jsonResponse);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
