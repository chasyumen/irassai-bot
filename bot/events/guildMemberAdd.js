module.exports = {
    name: "guildMemberAdd",
    event: "guildMemberAdd",
    exec: async function (member) {
        if (member.guild.available) {
            var serverData = await member.guild.getdb();
            console.log(serverData);
            if (!serverData.memberJoinNotify) return;
            if (serverData.memberJoinNotifyChannel) {
                var channel = member.guild.channels.cache.get(serverData.memberJoinNotifyChannel);
            } else {
                var channel = member.guild.systemChannel ?? null;
            }
            console.log(channel);
            if (!channel) {
                return;
            } 

            return await channel.send(`${member.user.tag}さん!! いらっさい!!`);
        }
    }
}