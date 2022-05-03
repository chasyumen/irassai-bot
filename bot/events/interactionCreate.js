module.exports = {
    name: "interactionCreate",
    event: "interactionCreate",
    exec: async function (interaction) {
        if (interaction.isCommand()) {
            if (interaction.channel.isThread()) {
                return false;
            }
            var res = {
                reply: async function (reply) {
                    if (interaction.deferred) {
                        return await interaction.editReply(reply)
                    } else {
                        return await interaction.reply(reply)
                    }
                },
                defer: async function () {
                    return await interaction.deferReply()
                }
            }

            var i = {
                commandName: interaction.commandName,
                isSlash: true,
                guild: interaction.guild,
                channel: interaction.channel,
                user: interaction.user,
            }

            if (client.commands.has(interaction.commandName)) {
                if (client.commands.get(interaction.commandName).isServerAdminOnly && !interaction.member.permissions.has("MANAGE_GUILD")) {
                    return interaction.reply("権限がありません。");
                }

                if (client.commands.get(interaction.commandName).isGlobalAdminOnly && !config.adminIDs.includes(interaction.userId)) {
                    return interaction.reply("権限がありません。");
                }

                return client.commands.get(interaction.commandName).exec(interaction, i, res);
            } else {
                return interaction.reply("コマンドが見つかりませんでした。");
            }
        }
    }
}