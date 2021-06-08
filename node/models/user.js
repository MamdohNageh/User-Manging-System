const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, minLength: 3, maxLength: 20 },
    email: { type: String, required: true },
    profilePicture: { type: String, required: true },
    city: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
