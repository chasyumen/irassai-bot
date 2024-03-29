module.exports = {
    name: "guildMemberAdd",
    event: "guildMemberAdd",
    exec: async function (member) {
        if (member.guild.available) {
            var serverData = await member.guild.getdb();
            // console.log(serverData);
            if (!serverData.memberJoinNotify) {
                var logString = `GUILD: \`${member.guild.name} (ID:${member.guild.id})\`, MEMBER: \`${member.user.tag} (ID:${member.user.id})\`, NOTIFY: \`DISABLED\``;

                client.emit("addLogQueue", "MEMBER", "JOIN", new Date(), logString);
                return;
            }
            if (serverData.memberJoinNotifyChannel) {
                var channel = member.guild.channels.cache.get(serverData.memberJoinNotifyChannel);
            } else {
                var channel = member.guild.systemChannel ?? null;
            }
            var userDisplayname = client.functions.get("usernameFormat").run(member.user.username, member.user.discriminator)
            // console.log(channel);
            if (!channel) {
                var logString = `GUILD: \`${member.guild.name} (ID:${member.guild.id})\`, MEMBER: \`${userDisplayname} (ID:${member.user.id})\`, NOTIFY: \`CHANNEL_NOT_FOUND\``;

                client.emit("addLogQueue", "MEMBER", "JOIN", new Date(), logString);
                return;
            } 
            var logString = `GUILD: \`${member.guild.name} (ID:${member.guild.id})\`, MEMBER: \`${userDisplayname} (ID:${member.user.id})\`, NOTIFY: \`ENABLED\``;

            client.emit("addLogQueue", "MEMBER", "JOIN", new Date(), logString);

            if (serverData.memberJoinNotifyType == "embed") {
                return await channel.send({embeds: [{
                    title: `${userDisplayname}さん!! いらっさい!!`,
                    color: config.colors.default_color,
                    description: `${userDisplayname}さんが${member.guild.name}に参加しました！`,
                    thumbnail: {
                        url: member.user.avatarURL({dynamic: true})
                    }
                }]});
            } else {
                return await channel.send(`${userDisplayname}さん!! いらっさい!!`);
            }
        }
    }
}