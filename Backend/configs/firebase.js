const admin = require('firebase-admin');
const serviceAccount = require('../configs/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'test-d9994.appspot.com',
});

const bucket = admin.storage().bucket();
module.exports = bucket;
