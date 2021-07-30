const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  // mongoDB에서 favorite 숫자 가져오기

  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    console.log(info);
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).json({ success: true, favoriteNumber: info.length });
  });

  // favorite 숫자 가져오면 클라이언트에 보내주기
});

module.exports = router;
