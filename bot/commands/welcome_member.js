module.exports = {
    name: "welcome_member",
    description: "メンバー参加通知の設定をします。",
    category: "config",
    isServerAdminOnly: true,
    isGlobalAdminOnly: false,
    slashOptions: {
        options: [
            {name: "on", description: "メンバー参加通知を有効化します", type: 1, options: []},
            {name: "off", description: "メンバー参加通知を無効化します", type: 1, options: []},
            {name: "set_channel", description: "チャンネルをセットします。", type: 1, options: [ { "name": "channel", "description": "チャンネル", "type": 7, "required": true }]},
        ]
    },
    exec: async function (interaction, i, res) {
        await res.defer();
        console.log(await i.guild.getdb());
        if (interaction.options.getSubcommand() == "on") {
            await i.guild.setdb({memberJoinNotify: true});
            return await res.reply("メンバー参加通知を有効にしました！");
        } else if (interaction.options.getSubcommand() == "off") {
            await i.guild.setdb({memberJoinNotify: false});
            return await res.reply("メンバー参加通知を無効にしました！");
        } else if (interaction.options.getSubcommand() == "set_channel") {
            var ch = interaction.options.getChannel("channel");
            if (ch.type == "GUILD_TEXT") {
                await interaction.guild.setdb({memberJoinNotifyChannel: ch.id});
                return await res.reply(`メンバー参加通知チャンネルを <#${ch.id}> に設定しました。`);
            } else {
                return await res.reply("指定されたチャンネルはテキストチャンネルではありません。");
            }
        }
    }
}