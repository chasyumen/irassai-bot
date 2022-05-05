const Util = require("util");
const { inspect } = Util;

module.exports = {
    name: "say",
    description: "Botをしゃべらせます。",
    category: "fun",
    isServerAdminOnly: true,
    isGlobalAdminOnly: false,
    slashOptions: {
        options: [
            {name: "text", description: "しゃべらせるメッセージ", type: 3, required: true, options: []},
        ]
    },
    exec: async function (interaction, i, res) {
        await res.defer({ephemeral: true});
        if (interaction.options.getString("text")) {
            await interaction.editReply("メッセージを送りました!", {ephemeral: true});
            return await interaction.channel.send(interaction.options.getString("text"));
        } else {
            return await res.deleteReply();
        }
    }
}