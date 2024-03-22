// this is the new yes
// new new
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
// const app = require('../server');
// const db = knex({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1', //localhost
//     user: 'manuel', //add your user name for the database here
//     port: 54322, // add your port number here
//     password: '', //add your correct password in here
//     database: 'smart-brain' //add your database name you created here
//   }
// });

let db;

try {
  db = knex({
    client: 'pg',
    connection: {
      host: 'dpg-cntlfcmn7f5s7382aq40-a',
      user: 'smart_brain_database_oghq_user',
      password: '2ygVbC46YIqmpoQNXbR5ServWQxCeAZQ',
      database: 'smart_brain_database_oghq'
    }
  });
} catch (error) {
  console.error('something is wrong:', error);
  // Handle the error gracefully, e.g., by shutting down the server or logging the error.
}

// db.select('*').from('users').then(data => {
//   console.log(data)
// })

app.use(bodyParser.json())
app.use(cors())



app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });
app.listen(3000, () => {
  console.log('app is running on port 3000')

})

module.exports = app;

