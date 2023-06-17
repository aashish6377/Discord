const { EmbedBuilder } = require('discord.js');

// module.exports=async (client)=>{
//     const snipedMessages = new Map();

// client.on('messageDelete', message => {
//   snipedMessages.set(message.channel.id, {
//     content: message.content,
//     author: message.author,
//     timestamp: message.createdTimestamp,
//   });
// });

// client.on('messageCreate', message => {
//   if (message.content === '!snipe') {
//     const sniped = snipedMessages.get(message.channel.id);

//     if (!sniped) return message.channel.send('No recently deleted messages.');

//     const embed = new EmbedBuilder()
//       .setTitle('Recently Deleted Messages')
//       .setColor('#ff0000')
//       .addFields({name:'Deleted by',value: sniped.author.tag,inline: true})
//       .setThumbnail(sniped.author.displayAvatarURL({ dynamic: true }))
//       .setTimestamp(sniped.timestamp)
//       .addFields([{name:'Content',value: sniped.content}]);

//     message.channel.send({ embeds: [embed] });
//   }
// });
// }

module.exports=(client)=>{
    const snipedMessages = new Map();

client.on('messageDelete', message => {
  const snipedArray = snipedMessages.get(message.channel.id)||[];
  if (snipedArray.length >= 10) snipedArray.shift();
  snipedArray.push({
    content: message.content,
    author: message.author,
    timestamp: message.createdTimestamp,
  });
  snipedMessages.set(message.channel.id, snipedArray);
});

client.on('messageCreate', message => {
  if (message.content.startsWith('!snipe')) {
    const snipeNumber = parseInt(message.content.split(' ')[1])|| 1 ;

    const snipedArray = snipedMessages.get(message.channel.id);
    if (!snipedArray || snipedArray.length < snipeNumber) {
      return message.channel.send('No recently deleted messages found.');
    }

    const sniped = snipedArray[snipedArray.length - snipeNumber];

    const embed =new EmbedBuilder()
    .setTitle(`Recently Deleted Messages (${snipeNumber}/${snipedArray.length})`)
    .setColor('#ff0000')
    .addFields({name:'Deleted by',value: sniped.author.tag,inline: true})
    .setThumbnail(sniped.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp(sniped.timestamp)
    .addFields({name:'Content',value: sniped.content});

  message.channel.send({ embeds: [embed] });
}
});
}