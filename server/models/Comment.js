const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* 
objectId를 가지고 있으면
userId로 유저 정보를 가져올 수 있다.
*/
const commentSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: String,
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
