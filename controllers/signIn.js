const processAuth = async (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Unable to process the request.");
  }

  try {
    //... fetch user from the db.
    const hash = await db("logins")
      .select("hash")
      .where("email", "=", email);

    // Chech hash
    if (hash.length) {
      // If hash exists for the email entered
      const match = await bcrypt.compare(password, hash[0].hash);
      if (match) {
        //login
        const user = await db("users")
          .select("*")
          .where("email", "=", email);
        res.json(user[0]);
      } else {
        // failed auth
        res.status(401).json("Wrong Credentials");
      }
    } else {
      res.status(401).json("Wrong Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Something Broke");
  }
};

module.exports = {
  processAuth
};
