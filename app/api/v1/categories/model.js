const { mongoose } = require('mongoose');
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Panjang Minimal 3 Karakter'],
      maxLength: [20, 'Panjang Maksimal 20 Karakter'],
      required: [true, 'Nama Harus Diisi'],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: 'Organizer',
      required: [true, 'Organizer is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Category', categorySchema);
