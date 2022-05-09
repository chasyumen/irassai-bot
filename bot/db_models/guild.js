const mongoose = require("mongoose");

const model = mongoose.Schema({
	guildId: { type: String || null, default: null },
	memberJoinNotifyChannel: { type: String || null, default: null },
	memberJoinNotify: { type: Boolean, default: false },
	verification: {
		isEnabled: { type: Boolean, default: false },
		type: { type: Number, default: 0 }, //0: button
		channel: { type: String || null, default: null }, // channel id or dm
		role: { type: String || null, default: null },
		latestVerifyMessage: { type: String || null, default: null }
	},
});

module.exports = mongoose.model("guild", model);