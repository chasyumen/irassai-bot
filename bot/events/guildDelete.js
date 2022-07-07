module.exports = {
    name: "guildDelete",
    event: "guildDelete",
    exec: async function (guild) {
        if (guild.available) {
            var logString = `GUILD: \`${guild.name} (ID:${guild.id})\``;

            client.emit("addLogQueue", "GUILD", "LEAVE", new Date(), logString);
            return true;
        }
    }
}