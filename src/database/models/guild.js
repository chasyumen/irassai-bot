const mongoose = require("mongoose");

const model = mongoose.Schema({
	guildId: { type: String || null, default: null },
	memberJoinNotifyChannel: { type: String || null, default: null },
	memberJoinNotifyType: { type: String || null, default: "text" },
	memberJoinNotify: { type: Boolean, default: false },
	// memberJoinMessage: {
	// 	isEnabled: { type: Boolean, default: false },
	// 	type: { type: Number, default: 0 }, //0: text, 1: embed
	// 	channel: { type: String || null, default: null },
	// 	displayNameType: { type: Number, default: 0 }, //0: Show Display name, 1: Show username
	// },
	verification: {
		isEnabled: { type: Boolean, default: false },
		type: { type: Number, default: 0 }, //0: button, 1: simple calculation
		channel: { type: String || null, default: null }, // channel id or dm
		role: { type: String || null, default: null },
		latestVerifyMessage: { type: String || null, default: null }
	},

	//deprecated: 
	

});

module.exports = mongoose.model("guild", model);