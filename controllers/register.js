const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission")
  }
  const hash = bcrypt.hashSync(password)

  // bcrypt.hash(password, null, null, function (err, hash) {
  //   console.log(hash)
  // });
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()

          })
          .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('unable to work'))

}
module.exports = {
  handleRegister: handleRegister
}