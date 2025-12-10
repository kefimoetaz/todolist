const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    validate: {
      validator: function(v) {
        return v && v.trim().length > 0;
      },
      message: 'Description cannot be empty'
    }
  },
  completed: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['work', 'personal', 'shopping', 'other'],
    default: 'other'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
