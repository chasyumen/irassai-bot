module.exports = {
    name: "guildCreate",
    event: "guildCreate",
    exec: async function (guild) {
        if (guild.available) {
            var logString = `GUILD: \`${guild.name} (ID:${guild.id})\``;

            client.emit("addLogQueue", "GUILD", "JOIN", new Date(), logString);
            return true;
        }
    }
}