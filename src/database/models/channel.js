const mongoose = require("mongoose");

const model = mongoose.Schema({
	channelId: { type: String || null, default: null },
	guildId: { type: String || null, default: null },
	autoReply: { type: Boolean, default: false },
});

module.exports = mongoose.model("channel", model);