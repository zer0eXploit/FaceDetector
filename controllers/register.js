const processRegister = async (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;

  if (!name || !email || !password) {
    return res.status(400).json("Unable to process the request.");
  }
  try {
    const trx = await db.transaction();

    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        console.log(err);
        res.status(500).json("Something Broke");
      } else {
        trx("logins")
          .insert({ email, hash })
          .returning("email")
          .then(registeredEmail => {
            db("users")
              .insert({
                name,
                email: registeredEmail[0],
                joined: new Date()
              })
              .returning("*")
              .then(registeredInfo => {
                res.json(registeredInfo[0]);
              })
              // Catch errors occur during saving to users table
              .catch(error => {
                console.log(error);
                res.status(500).json("Something Broke");
              });
          })
          // if nothing fails, then commit
          .then(trx.commit)
          // if something failed, rollback
          .catch(e => {
            console.log(e);
            trx.rollback();
            res.status(500).json("Something Broke");
          });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something Broke");
  }
};

module.exports = {
  processRegister
};
