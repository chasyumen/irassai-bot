module.exports = {
    name: "settings",
    description: "botのサーバー設定を確認します。",
    category: "config",
    isServerAdminOnly: true,
    isGlobalAdminOnly: false,
    slashOptions: {
        options: []
    },
    exec: async function (interaction, i, res) {
        return await res.reply("コマンドは開発中です");
    }
}