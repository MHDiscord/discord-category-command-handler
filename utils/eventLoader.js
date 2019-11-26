module.exports.run = async (client) => {
    client.on('ready', async () => require('../events/ready')(client));
    client.on('message', async (message) => require('../events/message')(client, message));
    client.on('messageUpdate', async (oldMessage, newMessage) => require('../events/message')(client, newMessage));
};