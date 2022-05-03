require("dotenv").config();
const { ShardingManager } = require("discord.js");
const shards = (global.shards = new ShardingManager("./bot/index.js"));

(async () => {
    await shards.spawn();
})();