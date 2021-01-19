const Clarifai = require("clarifai");

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = async (req, res) => {
  try {
    const response = await clarifaiApp.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.imageUrl
    );
    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Something Broke.");
  }
};

const updateEntry = async (req, res, db) => {
  const { id } = req.body;
  try {
    const updatedEntry = await db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries");
    if (updatedEntry.length) res.json(updatedEntry);
    else res.json("Could not update entries.");
  } catch (error) {
    console.log(error);
    res.status(500).json("Something Broke.");
  }
};

module.exports = {
  updateEntry,
  handleApiCall
};
