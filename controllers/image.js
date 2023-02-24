// this is new
const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: '29c6d9a7a94444cca0059bca356af8c1',
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: 'a403429f2ddf4b49b307e318f00e528b',
        version: '34ce21a40cc24b6b96ffee54aabff139',
      },
      req.body.input
    )
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json('unable to work with api'));
};
const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json('unable to get count for entries'));
};

module.exports = {
  handleImage,
  handleApiCall,
};
