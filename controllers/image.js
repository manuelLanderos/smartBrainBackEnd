const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: 'your_api_key_here', // Replace with your API Key
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: 'face-detection-workflow-fxb73u', // Your Model ID
        version: '3520030d353e4c89b5ddc723d797f432', // Your Model Version
      },
      req.body.input
    )
    .then((response) => {
      res.json(response); // Send the face detection response
    })
    .catch((err) => res.status(400).json('unable to work with api')); // Error handling
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
    .catch((err) => res.status(400).json('unable to get count for entries')); // Error handling
};

module.exports = {
  handleImage,
  handleApiCall,
};
