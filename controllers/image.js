const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: 'f4253a34115d453c8eadb027bd51edbe', // Your API key here
});

const handleApiCall = (req, res) => {
  const { input } = req.body; // Get the input from the request body (image URL)

  if (!input) {
    return res.status(400).json('Invalid request. Image URL is missing');
  }

  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, input) // Use the face detection model
    .then((response) => {
      res.json(response); // Send the response with the bounding boxes for faces
    })
    .catch((err) => {
      console.error('Error with Clarifai API:', err);
      res.status(400).json('Unable to work with API');
    });
};

const handleImage = (req, res, db) => {
  const { id } = req.body; // Get the user ID from the request body

  // Increment the entries count for the user
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries); // Return the updated entries count
    })
    .catch((err) => {
      console.error('Error incrementing entries:', err);
      res.status(400).json('Unable to get count for entries');
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
