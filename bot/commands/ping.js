module.exports = {
    name: "ping",
    description: "Botの速度を計測します。",
    category: "info",
    isServerAdminOnly: false,
    isGlobalAdminOnly: false,
    slashOptions: {
        // description: "Botの使い方等を表示します。",
        options: []
    },
    exec: async function (interaction, i, res) {
        // await res.defer();

        interaction.reply({
            embeds: [{
                title: "Pinging...",
                color: 0xFF3333,
                description: "Loading...",
            }]
        }).then(function (pingcheck) {
            var pingtime = Date.now() - interaction.createdTimestamp
            interaction.editReply({
                embeds: [{
                    title: "Pong!",
                    color: config.colors.default_color,
                    description: `Bot: {pms}ms\nWebSocket: {wms}ms`.replace(/{pms}/g, `${pingtime}`).replace(/{wms}/g, `${client.ws.ping}`)
                }]
            })
        });
    }
}