module.exports = {
  name: "about",
  description: "About our Kaki Ji aka Sadie Sink",
  devOnly: false,
  callback: (client, interaction) => {
    interaction.reply({
      components: [
        {
          type: 1,
          components: [
            {
              style: 5,
              label: `Know more`,
              url: `https://en.wikipedia.org/wiki/Sadie_Sink`,
              disabled: false,
              emoji: {
                id: `1114135813895225414`,
                name: `kaki_ji_middlefinger`,
                animated: false,
              },
              type: 2,
            },
          ],
        },
      ],
      embeds: [
        {
          type: "rich",
          title: `Sadie Sink`,
          description: `Description of Sadie Sink`,
          color: 0x00ffff,
          fields: [
            {
              name: `Mini Bio`,
              value: `Sadie Sink is an American actress. She started her career in the theater, and rose to prominence for her roles as Max in Netflix's science fiction drama series Stranger Things (2016) and Ziggy Berman in the horror films Fear Street: Part Two - 1978 (2021) and Fear Street: Part Three - 1666 (2021).`,
            },
            {
              name: `Early Life`,
              value: `Sadie was born in Brenham, Texas. She began taking acting classes and performing in community theatre in Houston at age nine. She performed in musical productions of White Christmas in 2011, and the title role of Annie in a regional production. She then auditioned for Broadway, and played the title role as well as Duffy in the 2012 revival of Annie. While starring in the play, she appeared in the Emmy-winning series The Americans (2013). In 2015, she played Suzanne Ballard in the NBC television series American Odyssey (2015), and portrayed a young Queen Elizabeth II alongside Helen Mirren in the Broadway production of The Audience.`,
            },
          ],
          image: {
            url: `https://media.glamour.com/photos/63c58002d68de8e23b270687/master/w_2560%2Cc_limit/1456702183`,
            height: 0,
            width: 0,
          },
          thumbnail: {
            url: `https://media.glamourmagazine.co.uk/photos/62e1173b72389e9526360cea/16:9/w_1920,h_1080,c_limit/THE%20WHALE%20SADIE%20SINK%20270722%20default-sq-GettyImages-1241760077.jpg`,
            height: 0,
            width: 0,
          },
          footer: {
            text: `Our Sweet Kaki Ji`,
            icon_url: `https://upload.wikimedia.org/wikipedia/commons/e/e2/Sadie_Sink_1-00895_%2843866089942%29_%28cropped%29.jpg`,
          },
        },
      ],
    });
  },
};
