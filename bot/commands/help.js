module.exports = {
    name: "help",
    description: "Botの使い方等を表示します。",
    category: "info",
    isServerAdminOnly: false,
    isGlobalAdminOnly: false,
    slashOptions: {
        // description: "Botの使い方等を表示します。",
        options: []
    },
    exec: async function (interaction, i, res) {
        await res.defer();

        var content = `コマンド一覧\n\n🛠️: BOT管理者のみが使用できます\n👑: サーバー管理者とBot管理者が利用できます\n👨: 全ユーザーが使用できます\n`;
        await async2.eachSeries(client.commands.toJSON(), async function (obj,) {
            var cmdemj = obj.isGlobalAdminOnly ? "🛠️" : (obj.isServerAdminOnly ? "👑" : "👨")
            var content_partial = `${cmdemj} | \`/${obj.name}\` | ${obj.description}`;
            content = `${content}\n${content_partial}`;
            return;
        });

        return await res.reply({
            embeds: [{
                title: "ヘルプ",
                color: config.default_color,
                description: content,
                footer: { text: config.credits }
            }]
        });
    }
}