
const requestOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Key 91b5da1f87944e70ab862d00204110ea'
  },
  // body: raw
};

const handleApiCall = (req, res) => {
  fetch("https://api.clarifai.com/v2/models/face-detection/versions/fe995da8cb73490f8556416ecf25cea3/outputs", requestOptions)
    .then(data => {
      res.json(data)
    }).catch(err => res.status(400).json('unable to work with api'))

}

const handleImage = (req, res, db) => {

  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1,)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get count for entries')
    )
}
module.exports = {
  handleImage,
  handleApiCall
}