const { ActivityType } = require("discord.js")
const { loadCommands } = require("../../Handlers/commandHandler");
const djs = require('mzrdjs');

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
	client.user.setPresence({ activities: [{ name: 'MZR Development ❤️', type: ActivityType.Watching }], status: 'idle' });

        loadCommands(client).then(() => djs.slashBuilder);
    },
};