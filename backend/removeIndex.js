const mongoose = require('mongoose');
   
async function removeIndex() {
  try {
    await mongoose.connect('mongodb://localhost:5000/test');
    const result = await mongoose.connection.db.collection('slots').dropIndex('email_1');
    console.log('Index dropped successfully:', result);
  } catch (err) {
    console.error('Error dropping index:', err);
  } finally {
    await mongoose.connection.close();
  }
}

removeIndex();