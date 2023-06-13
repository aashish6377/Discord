module.exports = {
  name: "kaki-quotes",
  description: "Searches for quotes of Kaki",

  callback: async (client, interaction) => {
    await interaction.deferReply();
    const Quotes = [
      "I have, like, a playlist with all my favourite songs on it. Sadie's Playlist is the soundtrack of my life. 'Wonderwall' by Oasis, 'Under The Bridge' by Red Hot Chili Peppers, TLC, 'Waterfalls' - I love the '90s.",
      "My dad's a teacher and a football coach, and he found a job in New Jersey.",
      "It's so easy to be insecure about your looks or if you're wearing the right clothes, or your hair and makeup. And I think it's just so important to stay true to who you are.",
      "I've always been laid back, go with the flow.",
      "I'm not really about spending every second on social media. I think there's a lot more useful things you can do with your time.",
      "I have not seen 'It' because I don't like horror movies. I don't mess with clowns or demons.",
      "College is right for some people, and it's not for others. I shouldn't rush into it just because that's what everyone does after high school is you go to college.",
      "I've been compared to a lot of redheads. Here's the thing though: you can look nothing like somebody, but if you both have red hair, all of a sudden people think you look exactly the same.",
      "Not everybody has their first kiss in front of 200 extras and their mom.",
      "I'm not just edgy, and I'm not just into a tomboy look, and I'm not just girly. I do what I want, and if I like something, I'll wear it.",
      "So I'm running in a new nike shoes for the first time and it feels like my feet are marshmallows",
      "Leave your lying boyfriend at home, grab your best friend and have a happy stranger things day",
      "I'm a lover not a fighter",
      "The first thing people get wrong about me? Probably my age maybe. They recognize me from the show when i was 14 or 15. They think somehow they have aged and i haven't. But... I have.",
      "My first big purchase... Was a car, that i got for myself on my 18th birthday. It was tesla it was exciting it was new was like i had it for myself and like i did it it was electric and i loved it and then i sold the car. Because I didn't use the car.",
      "I don't know if i can see it. It's like what if Netflix's watching",
      "Good morning. I have finally slept and now i think I'm officially at Japan time",
      "I'm vegan like i should be more concerned about a cattle running on a highway",
      "I'm at the hotel and i thought i should discuss about it cause it's cracking me up. So i get here and there's this Fridge... With this melon inside of it. And i ate all of it and I'm hoping it was for me to eat and then i didn't just eat some kind of like highly celebrated melon",
      "I can't do it, it tastes like a sonic burger",
    ];
    // await interaction.editReply();
    // console.log(Quotes[Math.floor(Math.random() * 5)]);
    await interaction.editReply(Quotes[Math.floor(Math.random() * 10)]);
  },
};
