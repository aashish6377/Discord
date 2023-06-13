const axios = require("axios");
require("dotenv").config();

const TENOR_API_KEY = process.env.TENOR_API_KEY;

module.exports = {
  name: "gif",
  description: "This command returns a random gif of Sadie Sink.",
  callback: async (client, interaction) => {
    try {
      const response = await axios.get("https://g.tenor.com/v1/random", {
        params: {
          key: TENOR_API_KEY,
          q: "Sadie Sink",
          limit: 1,
        },
      });
      const gifUrl = response.data.results[0].media[0].gif.url;
      interaction.reply(gifUrl);
    } catch (error) {
      console.error("Error retrieving the GIF:", error);
      interaction.reply("Sorry, an error occurred while retrieving the GIF.");
    }
  },
};
