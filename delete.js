require("dotenv").config();
const { REST, Routes } = require("discord.js");
const clientId = "1117034892690202624";

const rest = new REST().setToken(process.env.TOKEN);

// ...

// for guild-based commands
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// for global commands
rest
  .put(Routes.applicationCommands(clientId), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
