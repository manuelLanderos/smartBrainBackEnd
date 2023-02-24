
// this is new 
const Clarifai = require("clarifai")

const handleApiCall = (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).json('invalid request');
  }
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json('unable to work with API');
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  console.log(req.body)
  db('users').where('id', '=', id)
    .increment('entries', 1,)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get count for entries'))
}

module.exports = {
  handleImage,
  handleApiCall
};