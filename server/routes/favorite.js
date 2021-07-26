const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favortie");

router.get("/favoriteNumber", (req, res) => {
  // mongodb에서 favorite num을 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).json({ success: true, favoriteNumber: info.length, checking: info });
  });

  // favorite num 가져온 후 클라이언트에 보내주기
});

module.exports = router;
