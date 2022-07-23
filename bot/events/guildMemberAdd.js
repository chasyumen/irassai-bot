module.exports = {
    name: "guildMemberAdd",
    event: "guildMemberAdd",
    exec: async function (member) {
        if (member.guild.available) {
            var serverData = await member.guild.getdb();
            console.log(serverData);
            if (!serverData.memberJoinNotify) {
                var logString = `GUILD: \`${member.guild.name} (ID:${member.guild.id})\`, MEMBER: \`${member.user.tag} (ID:${member.user.id})\`, NOTIFY: \`false\``;

                client.emit("addLogQueue", "MEMBER", "JOIN", new Date(), logString);
                return;
            }
            if (serverData.memberJoinNotifyChannel) {
                var channel = member.guild.channels.cache.get(serverData.memberJoinNotifyChannel);
            } else {
                var channel = member.guild.systemChannel ?? null;
            }
            console.log(channel);
            if (!channel) {
                var logString = `GUILD: \`${member.guild.name} (ID:${member.guild.id})\`, MEMBER: \`${member.user.tag} (ID:${member.user.id})\`, NOTIFY: \`CHANNEL_NOT_FOUND\``;

                client.emit("addLogQueue", "MEMBER", "JOIN", new Date(), logString);
                return;
            } 
            var logString = `GUILD: \`${member.guild.name} (ID:${member.guild.id})\`, MEMBER: \`${member.user.tag} (ID:${member.user.id})\`, NOTIFY: \`true\``;

            client.emit("addLogQueue", "MEMBER", "JOIN", new Date(), logString);

            return await channel.send(`${member.user.tag}さん!! いらっさい!!`);
        }
    }
}