const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/getapet'),
    { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB');
  }

module.exports = mongoose