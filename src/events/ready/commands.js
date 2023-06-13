// const fetch = require("node-fetch");

// API_URL =
//   "https://api-inference.huggingface.co/models/Doge22/DialoGPT-medium-max";
module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author.bot) {
      return;
    }
    if (message.content === "hello") {
      message.reply("Hey!");
    }
    if (message.content === "doj" || message.content === "Doj") {
      const username = message.author.username;
      let tag = "Bhau";
      if (message.author.id === "926340206897020948") {
        tag = "Di";
      }
      message.reply(`Hello ${username} ${tag} <:namaste:1109084451671134229>`);
    }
    if (message.content === "embed") {
      const embed = new EmbedBuilder()
        .setTitle("Ember Title")
        .setDescription("Ember description here")
        .setColor("Random")
        .addFields({
          name: "Field title",
          value: "Some random value",
          inline: true,
        });

      message.channel.send({ embeds: [embed] });
    }
  });
};

// client.on("messageCreate", async (message) => {
//   // ignore messages from the bot itself
//   if (message.author.bot) {
//     return;
//   }
//   if (message.channel.id === "916387487545430076") {
//     // form the payload
//     const payload = {
//       inputs: {
//         text: message.content,
//       },
//     };
//     console.log(payload);
//     // form the request headers with Hugging Face API key
//     const headers = {
//       Authorization: "Bearer " + process.env.HUGGINGFACE_TOKEN,
//     };

//     // set status to typing
//     message.channel.sendTyping();
//     // query the server
//     const response = await fetch(API_URL, {
//       method: "post",
//       body: JSON.stringify(payload),
//       headers: headers,
//     });
//     const data = await response.json();
//     let botResponse = "";
//     if (data.hasOwnProperty("generated_text")) {
//       botResponse = data.generated_text;
//     } else if (data.hasOwnProperty("error")) {
//       // error condition
//       botResponse = data.error;
//       // botResponse = "meri ma chud gyi";
//     }
//     console.log(botResponse);
//     // send message to channel as a reply
//     message.reply(botResponse);
//   }
// });
