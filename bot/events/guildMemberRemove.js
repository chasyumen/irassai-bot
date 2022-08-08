module.exports = {
    name: "guildMemberRemove",
    event: "guildMemberRemove",
    exec: async function (member) {
        if (member.guild.available) {
            var serverData = await member.guild.getdb();
            console.log(serverData);
            if (!serverData.memberJoinNotify) {
                var logString = `GUILD: \`${member.guild.name} (ID:${member.guild.id})\`, MEMBER: \`${member.user.tag} (ID:${member.user.id})\`, NOTIFY: \`false\``;

                client.emit("addLogQueue", "MEMBER", "LEAVE", new Date(), logString);
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

                client.emit("addLogQueue", "MEMBER", "LEAVE", new Date(), logString);
                return;
            }
            var logString = `GUILD: \`${member.guild.name} (ID:${member.guild.id})\`, MEMBER: \`${member.user.tag} (ID:${member.user.id})\`, NOTIFY: \`true\``;

            client.emit("addLogQueue", "MEMBER", "LEAVE", new Date(), logString);

            if (serverData.memberJoinNotifyType == "embed") {
                return await channel.send({embeds: [{
                    title: `${member.user.tag}さん... いってらっさい...`,
                    color: config.colors.default_color,
                    description: `${member.user.tag}さんが${member.guild.name}から脱退しました...`,
                    thumbnail: {
                        url: member.user.avatarURL({dynamic: true})
                    }
                }]});
            } else {
                return await channel.send(`${member.user.tag}さん... いってらっさい...`);
            }
        }
    }
}