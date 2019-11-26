module.exports.run = async (client, args, message) => {
    /*
    Your code here. This command will be trigger if the user types ",,example example any arg".
    The message object is the one emitted by discord.js, and args is an array of every args.
    */
    message.reply(`This command works`)
}

module.exports.conf = {
    elevation: 0
}