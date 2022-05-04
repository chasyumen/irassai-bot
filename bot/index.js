const Discord = require("discord.js");
const { Client, Intents, Collection } = Discord;
const { join } = require("path");
const { readdirSync } = require("fs");
const mongoose = (global.mongoose = require("mongoose"));
const async2 = (global.async2 = require("async"));
const client = (global.client = new Client({
    //   ws: {
    //     properties: {
    //       $browser: "Discord Android",
    //       $device: "Discord Android",
    //     },
    //   },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        // Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        // Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_INVITES,
        // Intents.FLAGS.GUILD_VOICE_STATES,
        // Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        // Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
    allowedMentions: { repliedUser: false },
    presence: {
        status: "idle",
        activities: [
            { name: `起動中 | ${require("../package.json").version}` }
        ]
    },
    restGlobalRateLimit: 20
}));

global.config = require("../config.json");

client.isReady = false;
// client.aliases = new Collection();
client.commands = new Collection();
client.events = new Collection();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((db_connected) => {
    console.log("CONNECTED TO DATABASE");
});

process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

client.db = {};

readdirSync(join(__dirname, './events')).filter(x => x.endsWith('.js')).forEach(file => {
    let event = require(`./events/${file}`);
    client.on(event.event, event.exec);
    client.events.set(event.name, event);
});

readdirSync(join(__dirname, './commands')).filter(x => x.endsWith('.js')).forEach(file => {
    let command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    // command.aliases.forEach(aliases => {
    //     client.aliases.set(aliases, command);
    // });
});

readdirSync(join(__dirname, './db_models')).filter(x => x.endsWith('.js')).forEach(file => {
    let db_model = require(`./db_models/${file}`);
    client.db[file.replace(".js", "")] = db_model;
});

setTimeout(() => {
    client.login(process.env.DISCORD_TOKEN);
}, 3000)

Discord.Channel.prototype.getdb = async function () {
    var channelData = await this.client.db.channel.findOne({
        channelId: this.id
    });
    if (!channelData) {
        channelData = new client.db.channel({
            channelId: this.id
        });
    }
    return channelData;
};

Discord.Channel.prototype.setdb = async function (data) {
    var channelData = await this.client.db.channel.findOne({
        channelId: this.id
    });
    if (!channelData) {
      var dataSave = data;
      dataSave["channelId"] = this.id;
      return await (new client.db.channel(dataSave)).save();
    } else {
      return await client.db.channel.findOneAndUpdate({channelId: this.id}, data);
    }
};

Discord.Guild.prototype.getdb = async function () {
    var guildData = await this.client.db.guild.findOne({
        guildId: this.id
    });
    if (!guildData) {
        guildData = new client.db.guild({
            guildId: this.id
        });
    }
    return guildData;
};

Discord.Guild.prototype.setdb = async function (data) {
    var guildData = await this.client.db.guild.findOne({
        guildId: this.id
    });
    if (!guildData) {
      var dataSave = data;
      dataSave["guildId"] = this.id;
      return await (new client.db.guild(dataSave)).save();
    } else {
      return await client.db.guild.findOneAndUpdate({guildid: this.id}, data);
    }
};