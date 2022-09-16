const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const storage = getStorage();

const Club = require("../models/Club");
const fetchUser = require("../middleware/fetchuser");
const fetchAdmin = require("../middleware/fetchAdmin");
router.post("/", [fetchAdmin, multer().single("file")], async (req, res) => {
  try {
    let metadata = {
      contentType: req.file.mimetype,
      name: req.file.originalname,
    };
    // storage.put(req.file.buffer, metadata);
    // }
    const storageRef = ref(storage, `${req.file.originalname}`);
    const snapshot = await uploadBytes(storageRef, req.file.buffer, metadata);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log(req.user);
    const ClubData = await Club.create({
      name: req.body.name,
      image: downloadUrl,
      desc: req.body.desc,
      createdBy: req.user.id,
    });
    res.json(ClubData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
});
router.get("/", async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
});

module.exports = router;
