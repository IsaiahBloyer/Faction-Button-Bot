const config = require("../../config.json");
const Discord = require("discord.js");

module.exports =
{
    name: "help",
    description: "sends a message of all the available commands",
    execute(message)
    {
        if (message.member.roles.cache.some(r => r.id === config.allowedRoleID))
        {
            let embed = new Discord.MessageEmbed()
                .setColor("#7fff00")
                .setTitle("Sudo")
                .setTimestamp()
                .setDescription("All of the commands for the bot")
                .addField("Prefix", `Current Prefix: ${config.prefix}`)
                .addField("Fire", "Presses the button once, however many times you set it, or holds it")
                .addField("Set | Settings", "Let's you change certain settings on the bot")
                .addField("Sudo", "Let's you send messages to the bot")
                .addField("Whitelist", "Let's you add or remove yourself from the bot")
                .setFooter("Xine Development", "https://i.imgur.com/2hrtmj5.png");
            return message.channel.send(embed);
        }
    }
}