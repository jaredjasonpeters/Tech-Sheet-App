var mongoose = require('mongoose');

var TechSheetSchema = new mongoose.Schema({
  _brand: {
    type: String,
    required: true,
    minlength: 1
  },
  varietyName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    uppercase: true
  },
  speciesName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  keyFeatures: {
    type: Array,
    required: true,
  },
  briefDescription: {
    type: String,
    required: true,
    minlength: 1,
  },
  adaptation: {
    type: String,
    required: true,
    minlength: 1
  },
  seedingRate: {
    type: String,
    required: true
  },
  modified: {
    type: Boolean,
    default: false
  },
  lastModified: {
    type: Date,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
});

var TechSheet = mongoose.model('TechSheet', TechSheetSchema);

module.exports = {TechSheet};
