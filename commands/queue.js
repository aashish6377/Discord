const MAX_MESSAGE_LENGTH = 1500;

module.exports = {
  name: "queue",
  aliases: ["q"],
  run: async (client, message) => {
    function splitMessage(msg) {
      const chunks = [];

      while (msg.length > 0) {
        // Split the message into chunks of maximum length
        const chunk = msg.substring(0, MAX_MESSAGE_LENGTH);
        chunks.push(chunk);

        // Remove the processed chunk from the original message
        msg = msg.substring(MAX_MESSAGE_LENGTH);
      }

      return chunks;
    }

    const queue = client.distube.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} | There is nothing playing!`
      );

    const q = queue.songs
      .map(
        (song, i) =>
          `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
            song.formattedDuration
          }\``
      )
      .join("\n");

    if (q.length >= MAX_MESSAGE_LENGTH) {
      const messageChunks = splitMessage(q);

      // Send each chunk as a separate message
      messageChunks.forEach((chunk, index) => {
        // Delay sending each chunk to avoid rate limits (if necessary)
        setTimeout(() => {
          // Send the chunk as a message to the Discord channel
          message.channel.send(
            `${client.emotes.queue} | **Server Queue**\n${chunk}`
          );
        }, index * 1000); // Delay in milliseconds between each chunk
      });
    } else {
      message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`);
    }
  },
};
