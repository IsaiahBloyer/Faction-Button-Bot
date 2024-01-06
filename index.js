const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const mineflayer = require('mineflayer');
const config = require("./util/config.json");
const fs = require("fs");
const commandFiles = fs.readdirSync("./util/commands/discCommands/").filter(file => file.endsWith(".js"));
const functions = require("./util/functions");

bot.commands = new Discord.Collection();
for (const file of commandFiles)
{
    const command = require(`./util/commands/discCommands/${file}`);
    bot.commands.set(command.name, command);
}

const client = mineflayer.createBot(
{
    host: config.serverIP,
    port: 25565,
    username: config.username,
    password: config.password,
    version: config.serverVersion,
    keepAlive: true,
    viewDistance: "tiny",
    showCape: false,
    colorsEnabled: false
});

bot.on("ready", async () =>
{
    console.log(`✅ ${bot.user.username} is online`);
});

client.on("login", () =>
{
    console.log(`✅ ${client.username} has logged in`);
    if (config.gravity)
    {
        client.physics.gravity = 0;
    }
    client.chat(config.joinCommand);
});

client.chatAddPattern(/^\[([^ ]*)] \(([^ ]*) ➥ me\) (.*)$/, "archondm", "pvp.thearchon.net dm");

client.on("archondm", (a, username, message) =>
{
    let array = message.split(" ");
    let arg = array[0];
    if (arg.startsWith("I-") && arg.length === 67)
    {
        functions.addDB(username, message, client);
        return;
    }
    else if (arg.toLowerCase() === "sudo" || arg.toLowerCase() === "fire")
    {
        functions.searchDB(username, message, client);
        return;
    }
});

bot.on("message", async message =>
{
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let exec = bot.commands.get(cmd.substring(config.prefix.length, cmd.length));

    if (exec && cmd.startsWith(config.prefix))
    {
        exec.execute(message, args, client);
    }
});

bot.login(config.token);