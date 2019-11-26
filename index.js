const {
    Client
} = require('discord.js');
const {
    prefix,
    token,
    ownerId
} = require('./config.json');

const fs = require('fs');

const ElevationManager = require('./structures/elevationManager');

const client = new Client();
client.prefix = prefix;
client.ownerId = ownerId;

client.elevationManager = new ElevationManager(client);

client.login(token)
    .catch(console.error);

fs.readdir('./utils/', async (err, files) => {
    files.forEach(file => require(`./utils/${file}`)
        .run(client));
});