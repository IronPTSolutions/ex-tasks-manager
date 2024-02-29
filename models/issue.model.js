const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// validations: https://mongoosejs.com/docs/validation.html
const issueSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [5, "Title needs at least 5 chars"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [10, "Description needs at least 10 chars"],
    },
    private: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: String,
      enum: ["P1", "P2", "P3", "P4"],
      default: "P4",
    },
    type: {
      type: String,
      enum: ["task", "bug"],
      default: "task",
    },
    labels: [String],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: true
    }
  },
  { timestamps: true }
);

issueSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'issue',
  justOne: false
})

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;
