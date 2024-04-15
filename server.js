const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Initialize database connection
const db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-cntlfcmn7f5s7382aq40-a',
    user: 'smart_brain_database_oghq_user',
    password: '2ygVbC46YIqmpoQNXbR5ServWQxCeAZQ',
    database: 'smart_brain_database_oghq'
  }
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Handle preflight requests
app.options('*', cors());

// Routes
app.get('/', (req, res) => { res.send(db.users) });
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt); });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db); });
app.put('/image', (req, res) => { image.handleImage(req, res, db); });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res); });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

module.exports = app;
