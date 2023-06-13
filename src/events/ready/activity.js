const { ActivityType } = require("discord.js");
module.exports = (client) => {
  let status = [
    {
      name: "Sadie Sink Kaki Ji",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      name: "Sadie Sink",
      type: ActivityType.Watching,
    },
    {
      name: "Kaki Ji",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];
  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
};
