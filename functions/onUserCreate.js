const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.onUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const data = snap.data();

    console.log(userId);

    return null;
  });
