const Discord = require("discord.js");

module.exports = {
    name: "verify_settings",
    description: "ボタン式の簡易メンバー認証の設定ができます。",
    category: "config",
    isServerAdminOnly: true,
    isGlobalAdminOnly: false,
    slashOptions: {
        options: [
            { name: "on", description: "メンバー認証を有効化します", type: 1, options: [] },
            { name: "off", description: "メンバー認証を無効化します", type: 1, options: [] },
            { name: "resend", description: "メンバー認証用のメッセージを再度送信します。", type: 1, options: [] },
            { name: "set_channel", description: "チャンネルをセットします。", type: 1, options: [{ "name": "channel", "description": "チャンネル", "type": 7, "required": true }] },
            { name: "set_role", description: "ロールをセットします。", type: 1, options: [{ "name": "role", "description": "ロール", "type": 8, "required": true }] },
        ]
    },
    exec: async function (interaction, i, res) {
        await res.defer();
        if (!interaction.guild.me.permissions.has("MANAGE_ROLES")) {
            return await res.reply(`Botにロール管理権限がないため設定できませんでした。`);
        }
        var serverData = await i.guild.getdb();
        if (interaction.options.getSubcommand() == "on") {
            if ((serverData).verification.channel && (serverData).verification.role) {
                if (interaction.guild.channels.cache.has((serverData).verification.channel)) {
                    var channel = interaction.guild.channels.cache.get((serverData).verification.channel);
                    if (!channel.permissionsFor(interaction.guild.me).has(["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"])) {
                        return await res.reply(`このBotに指定されたチャンネルを見る権限、メッセージを送る権限、埋め込みリンクを送信する権限のいずれかまたはすべてが付与されていないため有効化できません。`);
                    }
                } else {
                    return await res.reply(`チャンネルが指定されていないか、指定されたチャンネルは削除されているかBotが読み取れない状態になっています。\n再度チャンネルを設定してください。`);
                }

                if (interaction.guild.roles.cache.has((serverData).verification.role)) {
                    var role = interaction.guild.roles.cache.get((serverData).verification.role);
                } else {
                    return await res.reply(`ロールが指定されていないか、指定されたロールは削除されているかBotが読み取れない状態になっています。\n再度ロールを設定してください。`);
                }
            } else {
                return await res.reply(`先にロールとチャンネルを設定してください。`);
            }
            var channel = interaction.guild.channels.cache.get((serverData).verification.channel);
            if (interaction.guild.channels.cache.has((serverData).verification.channel)) {
                var channel = interaction.guild.channels.cache.get((serverData).verification.channel);
                if (serverData["verification"]["latestVerifyMessage"]) {
                    try {
                        var mesg = await channel.messages.fetch(serverData["verification"]["latestVerifyMessage"]);
                        if (mesg) mesg.delete();
                    } catch (error) { }
                }
            }
            var msg = await channel.send(generateMessageForVerification());
            serverData["verification"]["latestVerifyMessage"] = msg.id;
            serverData["verification"]["isEnabled"] = true;
            await i.guild.setdb({ verification: serverData["verification"] });
            return await res.reply("メンバー認証を有効にしました！");
        } else if (interaction.options.getSubcommand() == "off") {
            serverData["verification"]["isEnabled"] = false;
            if (serverData["verification"]["latestVerifyMessage"]) {
                if (interaction.guild.channels.cache.has((serverData).verification.channel)) {
                    var channel = interaction.guild.channels.cache.get((serverData).verification.channel);
                    try {
                        var mesg = await channel.messages.fetch(serverData["verification"]["latestVerifyMessage"]);
                        if (mesg) mesg.delete();
                    } catch (error) { }
                }
            }
            await i.guild.setdb({ verification: serverData["verification"] });
            return await res.reply("メンバー認証を無効にしました！");
        } else if (interaction.options.getSubcommand() == "set_channel") {
            var ch = interaction.options.getChannel("channel");
            if (ch.type == "GUILD_TEXT") {
                if (!ch.permissionsFor(interaction.guild.me).has(["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"])) {
                    return await res.reply(`このBotには指定されたチャンネルを見る権限、メッセージを送る権限、埋め込みリンクの権限のいずれかまたはすべてがありません。`);
                }
                if (serverData.verification.latestVerifyMessage && interaction.guild.channels.cache.has(serverData["verification"]["channel"])) {
                    var channel = interaction.guild.channels.cache.get(serverData["verification"]["channel"]);
                    try {
                        var msg_del = await channel.messages.fetch(serverData.verification.latestVerifyMessage);
                        if (msg_del) {
                            msg_del.delete();
                        }
                    } catch (error) { }
                }
                var msg = await sh.send(generateMessageForVerification());
                serverData["verification"]["latestVerifyMessage"] = msg.id;
                serverData["verification"]["channel"] = ch.id;
                await i.guild.setdb({ verification: serverData["verification"] });
                return await res.reply(`メンバー参加通知チャンネルを <#${ch.id}> に設定しました。`);
            } else {
                return await res.reply("指定されたチャンネルはテキストチャンネルではありません。");
            }
        } else if (interaction.options.getSubcommand() == "set_role") {
            var role = interaction.options.getRole("role");
            var highestRole = interaction.guild.me.roles.highest;
            if (role.managed) {
                return await res.reply(`このロールは外部サービスに管理されている(個別のBot専用のロールなど)ため付与できません。`);
            }
            if (highestRole.position > role.position) {
                serverData["verification"]["role"] = role.id;
                await i.guild.setdb({ verification: serverData["verification"] });
                return await res.reply(`認証後に受け取るロールを <@&${role.id}> に設定しました。`);
            } else {
                return await res.reply(`認証後に受け取るロールの位置がBotが保有しているロールより高い位置にあるため、ロールを設定できませんでした。`);
            }
        } else if (interaction.options.getSubcommand() == "resend") {
            if (interaction.guild.channels.cache.has((serverData).verification.channel)) {
                var channel = interaction.guild.channels.cache.get((serverData).verification.channel);
                var msg = await channel.send(generateMessageForVerification());
                if (serverData["verification"]["latestVerifyMessage"]) {
                    try {
                        var mesg = await channel.messages.fetch(serverData["verification"]["latestVerifyMessage"]);
                        if (mesg) mesg.delete();
                    } catch (error) { }
                }
                serverData["verification"]["latestVerifyMessage"] = msg.id;
                await i.guild.setdb({ verification: serverData["verification"] });
                return await res.reply("送信しました。");
            } else {
                return await res.reply(`チャンネルが指定されていないか、指定されたチャンネルは削除されているかBotが読み取れない状態になっています。\n再度チャンネルを設定してください。`);
            }
        }
    }
}

function generateMessageForVerification() {
    var Button = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton().setCustomId('verifyMember').setLabel('認証').setStyle('PRIMARY')
    );
    return {
        embeds: [{
            title: "認証",
            color: config.default_color,
            description: "ボタンを押して認証してください"
        }], components: [Button]
    }
}