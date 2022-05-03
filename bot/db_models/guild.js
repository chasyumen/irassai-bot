const mongoose = require("mongoose");

const model = mongoose.Schema({
	guildId: { type: String || null, default: null },
	memberJoinNotifyChannel: { type: String || null, default: null },
	memberJoinNotify: { type: Boolean, default: false },
});

module.exports = mongoose.model("guild", model);