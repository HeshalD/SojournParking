const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  licensePlate: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  entryTime: {
    type: Date,
    required: true
  },
  exitTime: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v > this.entryTime;
      },
      message: 'Exit time must be after entry time'
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  durationHours: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

// Auto-populate slot information when querying
paymentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'slot',
    select: 'slotId location isReserved -_id'
  });
  next();
});

// Auto-calculate duration and amount
/*paymentSchema.pre('save', function(next) {
  if (this.isModified('entryTime') || this.isModified('exitTime')) {
    this.durationHours = (this.exitTime - this.entryTime) / (1000 * 60 * 60);
    this.totalAmount = Math.ceil(this.durationHours) * 3.0; // $3 per hour
  }
  next();
});*/

module.exports = mongoose.model('Payment', paymentSchema);