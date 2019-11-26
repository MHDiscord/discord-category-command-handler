const elevations = {};

// 0 for everyone, 10 for bot owner.

module.exports = class {
    constructor(client) {
        this.client = client;
        this.elevations = {
            owners: {
                level: 10,
                id: client.ownerId
            }
        };
    };

    calculateGuildElevation(userId, guild) {
        let elevation = 0;
        if (this.elevations.owners.id === userId) elevation = 10;
        return elevation;
    }
}