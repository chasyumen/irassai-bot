module.exports = {
    name: "autoreply",
    description: "自動返信を設定します。",
    category: "config",
    isServerAdminOnly: true,
    isGlobalAdminOnly: false,
    slashOptions: {
        options: [
            {name: "on", description: "このチャンネルの自動返信を有効化します", type: 1, options: []},
            {name: "off", description: "このチャンネルの自動返信を無効化します", type: 1, options: []},
        ]
    },
    exec: async function (interaction, i, res) {
        if (interaction.options.getSubcommand() == "on") {
            await i.channel.setdb({autoReply: true});
            res.reply("自動返信を有効にしました！");
        } else if (interaction.options.getSubcommand() == "off") {
            await i.channel.setdb({autoReply: false});
            res.reply("自動返信を有効にしました！");
        }
    }
}