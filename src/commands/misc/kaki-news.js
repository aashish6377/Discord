require("dotenv").config;
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NewsAPI);

module.exports = {
  name: "kaki-news",
  description: "Searches for news of Kaki",

  callback: async (client, interaction) => {
    await interaction.deferReply();

    try {
      const newsResponse = await newsapi.v2.everything({
        q: "sadie sink",
        language: "en",
      });
      //   console.log(newsResponse);

      const article = newsResponse.articles[Math.floor(Math.random() * 20)];

      interaction.editReply(`${article.title}\n${article.url}`);
    } catch (error) {
      console.error("Error fetching Sadie Sink news:", error);
      interaction.editReply(
        "Sorry, I couldn't fetch Sadie Sink news at the moment."
      );
    }
  },
};
