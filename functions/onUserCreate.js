const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: functions.config().mailchimp.apiKey,
  server: "us18",
});

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.onUserCreate = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    const email = userData.email;

    const listId = "d1be1c178c";

    const subscribingUser = {
      firstName: userData.name.split(" ")[0],
      lastName: userData.name.split(" ")[1],
      email,
    };

    async function updateTags(subscriberHash, tags) {
      const response = await mailchimp.lists.updateMemberTags(
        listId,
        subscriberHash,
        { tags: [...tags] }
      );

      console.log(
        `The return type for this endpoint is null, so this should be true: ${
          response === null
        }`
      );
    }

    async function run() {
      const response = await mailchimp.lists.addListMember(listId, {
        email_adress: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subcribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}`
      );

      return response.id;
    }

    try {
      const subscriberHash = await run();
      await updateTags(subscriberHash, [
        { name: "teste", status: "active" },
        { name: "teste2", status: "active" },
      ]);
    } catch (error) {
      console.log("Erro ao adicionar usuário ao Mailchimp", error);
    }
  });
