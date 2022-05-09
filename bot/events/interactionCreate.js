module.exports = {
    name: "interactionCreate",
    event: "interactionCreate",
    exec: async function (interaction) {
        if (!interaction.inGuild()) return;
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
                defer: async function (option) {
                    return await interaction.deferReply(option)
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
                    return interaction.reply({content: "権限がありません。", ephemeral: true});
                }

                if (client.commands.get(interaction.commandName).isGlobalAdminOnly && !config.adminids.includes(interaction.user.id)) {
                    return interaction.reply({content: "権限がありません。", ephemeral: true});
                }

                return client.commands.get(interaction.commandName).exec(interaction, i, res);
            } else {
                return interaction.reply("コマンドが見つかりませんでした。");
            }
        } else {
            var res = {
                reply: async function (reply) {
                    if (interaction.deferred) {
                        return await interaction.editReply(reply)
                    } else {
                        return await interaction.reply(reply)
                    }
                },
                defer: async function (option) {
                    return await interaction.deferReply(option)
                }
            }
            if (client.interactions.has(interaction.customId.split(":")[0])) {
                return client.interactions.get(interaction.customId.split(":")[0]).exec(interaction, res);
            } else {
                return interaction.reply({content: "インタラクションが見つかりません。", ephemeral: true});
            }
        }
    }
}