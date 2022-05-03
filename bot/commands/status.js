const { freemem, totalmem, cpus } = require("os")
const osu = require('node-os-utils');

module.exports = {
    name: "status",
    description: "サーバーの状態を取得します",
    category: "info",
    isServerAdminOnly: false,
    isGlobalAdminOnly: false,
    slashOptions: {
        options: []
    },
    exec: async function (interaction, i, res) {
        res.reply({
            embeds: [{
                title: "ステータス",
                color: config.default_color,
                description:
                    `CPU: \`${cpus()[0].model}\` x${cpus().length} / ${await cpugetusage()}%\n` +
                    `メモリー: ${Math.round((totalmem() - freemem() / 1024 / 1024) * 100) / 100}MB/${Math.round((totalmem() / 1024 / 1024) * 100) / 100}MB (${Math.round((totalmem() - freemem()) / totalmem() * 1000) / 10}%)` +
                    ``
            }]
        })
        async function cpugetusage() {
            return await new Promise((resolve, reject) => {
                osu.cpu.usage()
                    .then(info => {
                        resolve(info);
                    })
            })
        }
    }
}