const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// validations: https://mongoosejs.com/docs/validation.html
const messageSchema = new Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true
    },
    text: {
      type: String,
      required: [true, 'Message text is required']
    },
    issue: {
      type: mongoose.Types.ObjectId,
      ref: 'Issue',
      require: true
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
