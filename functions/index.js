const functions = require("firebase-functions");
const rq = require("request-promise");
const lineNotify = require("line-notify-nodejs")(
  "CPXqOhK04uWGPClVHHIw4R65gbUryH9SN8RHqHva4SR"
);

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase! v333333333333");

  lineNotify
    .notify({
      message: "send test"
    })
    .then(() => {
      console.log("send completed!");
      return "Sent!";
    })
    .catch(err => {
      console.error("Errorrrr: " + err);
      return "Error" + err;
    });
});
