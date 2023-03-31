require("dotenv").config();
const { ShardingManager } = require("discord.js");
const shards = (global.shards = new ShardingManager("./bot/index.js", {token: process.env.DISCORD_TOKEN}));
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

(async () => {
    await shards.spawn();
})();