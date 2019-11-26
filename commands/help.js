// THIS COMMAND IS UNFINISHED

const {
    RichEmbed
} = require('discord.js');

module.exports.run = async (client, args, message) => {
    let embed = new RichEmbed()
        .setTitle("Help")
        .setAuthor("RPG Bot", client.user.avatarURL)
        .setColor('RANDOM')
        .setDescription("Here are all the categories. Click on reactions to navigate through pages.")
        .setFooter("Asked by " + message.author.tag)
        .setTimestamp();

    let emojis = [];

    Object.keys(client.commands)
        .forEach(key => {
            let emoji;
            switch (key) {
                case 'main':
                    emoji = '🇲';
                    break;

                case 'example':
                    emoji = '🇪';
                    break;

                default:
                    break;
            }
            emojis.push(emoji);
            embed.addField(emoji, `\`${key}\``, true);
        });

    let m = await message.channel.send({
        embed
    });

    emojis.reduce((promise, emoji) => promise.then(() => m.react(emoji)), Promise.resolve());


    const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === message.author.id;
    m.awaitReactions(filter, {
            max: 1,
            time: 15000
        })
        .then(collected => {
            let choice = client.commands
        })
        .catch(console.error);
};

module.exports.conf = {
    level: 0
}