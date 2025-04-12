const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: 'f4253a34115d453c8eadb027bd51edbe', // Replace with your actual API key
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: 'face-detection-workflow-fxb73u', // Your Clarifai model ID
        version: '7e1be10d41364aa7a9406a8a21a54699',     // Replace with the correct version ID if needed
      },
      req.body.input
    )
    .then((response) => {
      res.json(response); // Sending the face detection response back
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
