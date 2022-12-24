const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let ticketCategoriesSchema = Schema(
  {
    type: {
      type: String,
      required: [true, 'Type is required'],
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    statusTicketCategories: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    expired: {
      type: Date,
    },
  },
  { timestamps: true }
);

const eventSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minLength: 3,
      maxLength: 50,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    about: {
      type: String,
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
    },
    keyPoint: {
      type: [String],
    },
    venueName: {
      type: String,
      required: [true, 'Venue Name is required'],
    },
    statusEvent: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    tickets: {
      type: [ticketCategoriesSchema],
      required: [true, 'Tickets is required'],
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    talent: {
      type: mongoose.Types.ObjectId,
      ref: 'Talent',
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model('Event', eventSchema);
