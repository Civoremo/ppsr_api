/** @format */

const { express } = require("../../configMW/configMW.js");
const { adminProtected } = require("../middleware/protectedMW.js");

const galleryDB = require("../helpers/galleryDB.js");
const router = express.Router();

router.get("/all", (req, res) => {
  galleryDB
    .getAllGallery()
    .then(gallery => {
      // console.log(gallery);
      res.status(200).json(gallery);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err, error: "Failed to load gallery images." });
    });
});

router.post("/post", adminProtected, (req, res) => {
  const imageUrl = req.body;
  galleryDB
    .galleryPost(imageUrl)
    .then(result => {
      res.status(200).json(1);
    })
    .catch(err => {
      res.status(500).json({ err, error: "Failed to save image to gallery." });
    });
});

router.delete("/delete", adminProtected, (req, res) => {
  const imageId = req.body.imageId;
  galleryDB
    .galleryDelete(imageId)
    .then(result => {
      if (result === 1) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          result,
          deleted: 0,
          message: " - Gallery image failed to delete, image ID not found.",
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, error: "Failed to delete image from gallery." });
    });
});

module.exports = router;
