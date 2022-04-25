const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    national_id: {
      type: String,
      index: { unique: true, dropDups: true },
      unique: true,
      required: [true, 'Please provide a notional_id'],
      trim: true,
      lowercase: true,
    },
    fingerprint: {
      type: Array,
      required: true,
      select: false,
    },
    disease: {
      type: Array,
    },
    nationality: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'Egyption',
    },
    name: {
      type: String,
      required: [true, 'Please provide a fristName'],
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      // required: [true, 'Please provide a gender'],
      enum: ['Male', 'Female'],
      default: 'Male',
    },
    birthday: {
      type: Date,
    },
    phone: {
      type: String,
      unique: true,
    },

    slug: String,
    imageProfile: {
      type: String,
    },
    place_of_birth: {
      type: String,
      trim: true,
    },
    address: {
      alias: String,
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      enum: ['user', 'admin', 'owner'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
