const mongoose = require("mongoose");

const model = mongoose.Schema({
	guildId: { type: String || null, default: null },
	memberJoinNotifyChannel: { type: String || null, default: null },
	disableMemberJoinNotify: { type: Boolean, default: false },
});

module.exports = mongoose.model("channel", model);