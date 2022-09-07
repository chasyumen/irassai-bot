module.exports = {
    name: "messageCreate",
    event: "messageCreate",
    exec: async function (message) {
        if (message.author.bot) return;
        if (message.channel.type !== "GUILD_TEXT") {
            return;
        }
        var channelData = await message.channel.getdb();
        if (channelData.autoReply) {
            if (!message.channel.permissionsFor(message.guild.me).has([1 << 10, 1 << 11])) return;
            if (message.content.match(/いらっさい/)) {
                message.reply("いらっさい");
            } else if (message.content.match(/いってらっさい/)) {
                message.reply("いってらっさい");
            } //else if (message.content.match(/ゆっくり茶番劇/)) {
            // message.reply("#ゆっくり茶番劇を守れ");
            // }
        }
    }
}