const { DisTube } = require("distube");
const Discord = require("discord.js");
const path = require("path");

const fs = require("fs");

const prefix = "?";
const config = require("../../../config.json");

module.exports = (client) => {
  console.log("Hi");
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.emotes = config.emoji;
  fs.readdir(path.resolve(__dirname, "../../../commands"), (err, files) => {
    if (err) return console.log(`Could not find any commands! ${err}`);
    const jsFiles = files.filter((f) => f.split(".").pop() === "js");
    // console.log(jsFiles);
    if (jsFiles.length <= 0)
      return console.log("Could not find any commands2!");
    jsFiles.forEach((file) => {
      const cmd = require(`../../../commands/${file}`);
      //   console.log(`Loaded ${file}`);
      client.commands.set(cmd.name, cmd);
      if (cmd.aliases)
        cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
    });
  });
  client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
  });
  client.on("ready", () => {
    console.log(`${client.user.tag} is ready to play music.`);
  });

  client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));
    if (!cmd) return;
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
      return message.channel.send(
        `${client.emotes.error} | You must be in a voice channel!`
      );
    }
    try {
      cmd.run(client, message, args);
    } catch (e) {
      console.error(e);
      message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
    }
  });

  const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${
      queue.filters.names.join(", ") || "Off"
    }\` | Loop: \`${
      queue.repeatMode
        ? queue.repeatMode === 2
          ? "All Queue"
          : "This Song"
        : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
  client.distube
    .on("playSong", (queue, song) =>
      queue.textChannel.send(
        `${client.emotes.play} | Playing \`${song.name}\` - \`${
          song.formattedDuration
        }\`\nRequested by: ${song.user}\n${status(queue)}`
      )
    )
    .on("addSong", (queue, song) =>
      queue.textChannel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
      )
    )
    .on("addList", (queue, playlist) =>
      queue.textChannel.send(
        `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
          playlist.songs.length
        } songs) to queue\n${status(queue)}`
      )
    )
    .on("error", (channel, e) => {
      if (channel)
        channel.send(
          `${client.emotes.error} | An error encountered: ${e
            .toString()
            .slice(0, 1974)}`
        );
      else console.error(e);
    })
    .on("empty", (channel) =>
      channel.send("Voice channel is empty! Leaving the channel...")
    )
    .on("searchNoResult", (message, query) =>
      message.channel.send(
        `${client.emotes.error} | No result found for \`${query}\`!`
      )
    )
    .on("finish", (queue) => queue.textChannel.send("Finished!"));
};
