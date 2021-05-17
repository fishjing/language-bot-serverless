const { App, ExpressReceiver } = require("@slack/bolt");
const serverlessExpress = require("@vendia/serverless-express");

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
});

const guysMessage =
  "Please bear in mind that the makeup of this Slack is " +
  "very diverse, and some people feel excluded by the " +
  "use of the term “guys”. Maybe you could try using " +
  "_people_, _team_, _all_, _folks_, _everyone_, or _y'all_?";

const crazyMessage =
  "Using the word _crazy_ is considered by some to be insensitive to sufferers of mental illness, have you considered a different adjective like _ridiculous_, _outrageous_, _unthinkable_, _nonsensical_, _incomprehensible_?";

const insaneMessage =
  "The word _insane_ is considered by some to be insensitive to sufferers of mental illness. Have you considered using a different adjective instead?";

const sexyMessage = "Did you mean _zesty_?";

const slaveMessage =
  "If you are referring to a data replication strategy, please consider a term such as _follower_ or _replica_.";

const postMessage =
  (text) =>
  async ({ message, client }) => {
    await client.chat.postEphemeral({
      channel: message.channel,
      user: message.user,
      text,
    });
  };

app.message(/you guys/gi, postMessage(guysMessage));
app.message(/these guys/gi, postMessage(guysMessage));
app.message(/my guys/gi, postMessage(guysMessage));
app.message(/those guys/gi, postMessage(guysMessage));
app.message(/hey guys/gi, postMessage(guysMessage));
app.message(/hello guys/gi, postMessage(guysMessage));
app.message(/hi guys/gi, postMessage(guysMessage));
app.message(/the guys/gi, postMessage(guysMessage));
app.message(/these guys/gi, postMessage(guysMessage));
app.message(/thanks guys/gi, postMessage(guysMessage));
app.message(/guys\?/gi, postMessage(guysMessage));
app.message(/crazy/gi, postMessage(crazyMessage));
app.message(/insane/gi, postMessage(insaneMessage));
app.message(/sexy/gi, postMessage(sexyMessage));
app.message(/slave/gi, postMessage(slaveMessage));

module.exports.handler = serverlessExpress({
  app: expressReceiver.app,
});
