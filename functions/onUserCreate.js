const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: functions.config().mailchimp.apiKey,
  server: "us12",
});

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.onUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    const email = userData.email;

    const listId = "14ac8d6a41";
    const subscribingUser = {
      firstName: userData.name.split(" ")[0],
      lastName: userData.name.split(" ")[1],
      email,
    };
  });

async function updateTags(subscriberHash, tags) {
  const response = await mailchimp.lists.updateMemberTags(
    listId,
    subscriberHash,
    { tags: [...tags] }
  );
}
