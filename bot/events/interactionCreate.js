module.exports = {
    name: "interactionCreate",
    event: "interactionCreate",
    exec: async function (interaction) {
        if (!interaction.inGuild()) {
            return await interaction.reply("このBotは現在DMでのコマンドには応答できません。");
        }
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

            var logString = `COMMAND: \`${i.commandName}\`, GUILD: \`${i.guild.name} (ID:${i.guild.id})\`, ` +
                `CHANNEL: \`${i.channel.name}, (ID:${i.channel.id})\`` +
                `USER: \`${i.user.tag}, (ID:${i.user.id})\``;

            client.emit("addLogQueue", "COMMAND", "EXECUTE", new Date(), logString);

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