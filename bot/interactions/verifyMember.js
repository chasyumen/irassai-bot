module.exports = {
    name: "verifyMember",
    type: "MESSAGE_COMPONENT",
    exec: async function (interaction, res) {
        var serverData = await interaction.guild.getdb();
        if (!serverData.verification.isEnabled) {
            return await res.reply({content: "このサーバーでは認証機能が無効化されています。", ephemeral: true} );
        }

        if (!interaction.guild.roles.cache.has(serverData.verification.role)) {
            return await res.reply({content: "セットアップされたロールが削除されています。\nサーバー管理者にお問い合わせください。", ephemeral: true});
        }

        if (!(serverData.verification.channel == interaction.channel.id)) {
            return await res.reply({content: "指定されたチャンネルではないチャンネルのメッセージは機能しません。\nサーバー管理者にお問い合わせください。", ephemeral: true} );
        }

        var role = interaction.guild.roles.cache.get(serverData.verification.role);
        var highestRole = interaction.guild.me.roles.highest;

        if (interaction.member.roles.cache.has(role.id)) {
            return await res.reply({content: `あなたは既に認証済みです。`, ephemeral: true});
        }
        if (highestRole.position > role.position) {
            try {
                await interaction.member.roles.add(role);
                return await res.reply({content: `認証しました。`, ephemeral: true});
            } catch (error) {
                console.error(error);
                return await res.reply({content: `不明なエラーが発生しました。\nBot管理者にお問い合わせください。`, ephemeral: true});
            }
        } else {
            return await res.reply({content: `認証後に受け取るロールの位置がBotが保有しているロールより高い位置にあるため、ロールを付与できませんでした。`, ephemeral: true});
        }
    }
}