
// this is new 
const Clarifai = require("clarifai")
const app = new Clarifai.App({
  apiKey: '2b3cddc9a4134b3dafa87ca2056f55f6',
});

const handleApiCall = (req, res) => {
  // const { input } = req.body;
  // if (!input) {
  //   return res.status(400).json('invalid request');
  // }
  app.models
    //   .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    //   .then(data => {
    //     res.json(data);
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

  db('users').where('id', '=', id)
    .increment('entries', 1,)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries)
    })
    .catch((err) => res.status(400).json('unable to get count for entries'))
}

module.exports = {
  handleImage,
  handleApiCall,
};