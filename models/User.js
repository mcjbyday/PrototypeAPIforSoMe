const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./Thought');

// friends are simply other users associated with a particular user's instance

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      max_length: 50,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    // only provide this in the scenario where you want adifferent Id from the _id name
    id: false, 
  }
);


// Create a virtual property `friendCount` that gets the amount of associated users per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });


const User = model('user', userSchema);

module.exports = User;
