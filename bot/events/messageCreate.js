module.exports = {
    name: "messageCreate",
    event: "messageCreate",
    exec: async function (message) {
        if (message.author.bot) return;
        
        var channelData = await message.channel.getdb();
        if (channelData.autoReply) {
            if (message.content.match(/いらっさい/)) {
                message.reply("いらっさい");
            } else if (message.content.match(/いってらっさい/)) {
                message.reply("いってらっさい");
            }
        }
    }
}