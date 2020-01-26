const profileGet = async (req, res, db) => {
  const { id } = req.params;
  try {
    const user = await db
      .select("*")
      .from("users")
      .where({ id });
    // Check if the result is empty
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(404).json("No User Found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Error Getting User!");
  }
};

module.exports = {
  profileGet
};
