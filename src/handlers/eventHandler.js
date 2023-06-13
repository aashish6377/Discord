const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  // console.log(eventFolders);
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);
    // console.log(eventFiles);
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();
    // console.log(eventName);
    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        // console.log(eventFile);
        const eventFunction = require(eventFile);
        // console.log(eventFunction);
        await eventFunction(client, arg);
      }
    });
  }
};
