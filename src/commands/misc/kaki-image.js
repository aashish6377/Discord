const google = require("googlethis");

module.exports = {
  name: "kaki-search",
  description: "Searches for images of Kaki",

  callback: async (client, interaction) => {
    await interaction.deferReply();
    const images = await google.image("Sadie Sink", { safe: false });
    await interaction.editReply(images[Math.floor(Math.random() * 50)].url);
  },
};
