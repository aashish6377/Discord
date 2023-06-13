module.exports = {
  name: "previous",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing in the queue right now!`
      );
    const song = queue.previous().catch((err) => {
      message.reply(err.message);
      return;
    });
    if (song.name === undefined) {
      return;
    }
    message.channel.send(
      `${client.emotes.success} | Now playing:\n${song.name}`
    );
  },
};
