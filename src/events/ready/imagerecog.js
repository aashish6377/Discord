const { AttachmentBuilder } = require("discord.js");
const request = require("request");
const fs = require("fs");
require("dotenv").config();
const sharp = require("sharp");

// Set your API key and endpoint URL
const subscriptionKey = process.env.Azure_SubscriptionKey;
const endpoint =
  "https://cognitive22.cognitiveservices.azure.com/vision/v3.1/analyze";

module.exports = async (client) => {
  //   console.log("hue hue");
  // Set up the message event
  client.on("messageCreate", async (msg) => {
    if (msg.author.bot) {
      return;
    }
    // console.log("Message received: ", msg.content);
    // Check if the message contains an attachment
    if (msg.attachments.size > 0) {
      try {
        // Get the attachment URL
        const attachment = msg.attachments.first();
        const imageUrl = attachment.url + `?t=${Date.now()}`;
        // console.log("Image URL: ", imageUrl);

        // Delete the input.jpg file to ensure that the bot is working with the latest image
        fs.unlink("input.jpg", (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //   console.log("Previous image deleted");
        });

        // Download the image to a file
        const imageFile = fs.createWriteStream("input.jpg");
        request(imageUrl)
          .pipe(imageFile)
          .on("close", async () => {
            // console.log("Image downloaded");
            // Load the image file
            let image = sharp("input.jpg")
              // Resize the image to 500 pixels wide
              .resize({ width: 4000, height: 4000, fit: "inside" })
              .jpeg({ quality: 90 });
            // Save the resized image to a new file

            // Convert the image buffer to a Promise and wait for it to resolve
            const buffer = await image.toBuffer();
            // console.log("Image buffer created");
            // Save the image buffer to a file
            fs.writeFileSync("image.jpg", buffer);
            // console.log("Image saved");

            // await image.toFile("image.jpg", (err, info) => {
            //   if (err) {
            //     console.error(err);
            //   } else {
            //     console.log(info);
            //   }
            // });

            // Send the image to the API to generate a caption
            const requestData = {
              url: endpoint,
              headers: {
                "Ocp-Apim-Subscription-Key": subscriptionKey,
                "Content-Type": "application/octet-stream",
              },
              body: fs.readFileSync("image.jpg"),
            };
            // console.log(requestData.body);
            request.post(requestData, (error, response, body) => {
              if (error) {
                console.error(error);
                return;
              }
              //   console.log("API response received");
              // console.log(body);
              // Parse the API response to get the caption
              const jsonResponse = JSON.parse(body);
              //   console.log(jsonResponse);
              // const caption = jsonResponse.description.captions[0].text;
              // Check if categories is defined and an array
              const categories = jsonResponse.categories;
              let caption = "Error generating image caption";

              if (
                categories &&
                Array.isArray(categories) &&
                categories.length > 0
              ) {
                // Sort the categories by score in descending order
                categories.sort((a, b) => b.score - a.score);

                // Get the top 3 categories
                const topCategories = categories.slice(0, 3);

                // Construct the caption by displaying the top 3 categories and their scores
                caption = `The image contains ${
                  topCategories.length > 1 ? "categories" : "a category"
                }: ${topCategories
                  .map(
                    (category) =>
                      `${category.name} (${(category.score * 100).toFixed(2)}%)`
                  )
                  .join(", ")}.`;

                // console.log("Image caption: ", caption);
              } else {
                console.error(
                  "Error: categories is not defined or is not an array"
                );
                caption = "Error generating image caption";
              }
              //   console.log(caption);

              // Send the caption as a message
              msg.reply(`The image caption is: ${caption}`);
              //   console.log("Caption sent as message");
            });
          });
      } catch (e) {
        console.log(e);
        msg.reply("Error: " + e);
      }
    }
  });
};
