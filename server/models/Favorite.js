const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* 
objectId를 가지고 있으면
userId로 유저 정보를 가져올 수 있다.
*/
const favoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movieId: {
      type: String,
    },
    movieTitle: {
      type: String,
    },
    moviePost: {
      type: String,
    },
    movieRunTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite };
