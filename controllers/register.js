const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;

  console.log('Email:', email);
  console.log('Name:', name);
  console.log('Password:', password);

  if (!email || !name || !password) {
    console.log('Incorrect form submission');
    return res.status(400).json('incorrect form submission');
  }

  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    console.log('Transaction started');

    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        console.log('Inserted into login table:', loginEmail);

        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          })
          .then(user => {
            console.log('Inserted into users table:', user);
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(err => {
        console.log('Transaction error:', err);
        trx.rollback();
        res.status(400).json('er1');
      });
  })
    .catch(err => {
      console.log('Database connection error:', err);
      res.status(400).json('Database connection error: ' + err.message);
    });
};

module.exports = {
  handleRegister: handleRegister
};