module.exports = async (client, message) => {
    if (message.author.bot || !message.content.startsWith(client.prefix)) return;

    let args = message.content.trim()
        .split(' ');
    let command = args.shift()
        .toLowerCase()
        .slice(client.prefix.length);

    // ||-----------------||
    // || C O M M A N D S ||
    // ||-----------------||

    if (client.commands.main[command]) {
        if (client.elevationManager.calculateGuildElevation(message.author.id, message.guild) < client.commands.main[command].conf.elevation) return message.reply(`you don't have the required elevation to use this command.`);
        return client.commands.main[command].run(client, args, message);
    }

    if (!args[0]) return;

    // ||-------------------------------||
    // || S I N G L E - C A T E G O R Y ||
    // ||        C O M M A N D S        ||
    // ||-------------------------------||
    // I know it's not clean

    let cat = command;
    command = args.shift();

    if (!client.commands[cat]) return;

    if (client.commands[cat][command]) {

        if (client.commands[cat][command].conf) {
            if (client.elevationManager.calculateGuildElevation(message.author.id, message.guild) < client.commands[cat][command].conf.elevation) return message.reply(`you don't have the required elevation to use this command.`);
            return client.commands[cat][command].run(client, args, message);

        } else if (!args[0]) {
            if (client.elevationManager.calculateGuildElevation(message.author.id, message.guild) < client.commands[cat][command].conf.elevation) return message.reply(`you don't have the required elevation to use this command.`);
            return client.commands[cat][command].run(client, args, message);

        } else if (!client.commands[cat][args[0]]) {
            if (client.elevationManager.calculateGuildElevation(message.author.id, message.guild) < client.commands[cat][command].conf.elevation) return message.reply(`you don't have the required elevation to use this command.`);
            return client.commands[cat][command].run(client, args, message);

        } else {

            // ||-------------------------||
            // || S U B - C A T E G O R Y ||
            // ||     C O M M A N D S     ||
            // ||-------------------------||

            let subcat = command;
            command = args.shift();

            if (!client.commands[cat][subcat]) return;

            if (client.commands[cat][subcat][command]) {
                if (client.elevationManager.calculateGuildElevation(message.author.id, message.guild) < client.commands[cat][subcat][command].conf.elevation) return message.reply(`you don't have the required elevation to use this command.`);
                return client.commands[cat][subcat][command].run(client, args, message);
            }

        }
    }
};