const config = require("../../config.json");
const Discord = require("discord.js");

module.exports =
{
    name: "sudo",
    description: "sudos a message to the bot",
    execute(message, args, client)
    {
        if (message.member.roles.cache.some(r => r.id === config.allowedRoleID))
        {
            let embed = new Discord.MessageEmbed()
                .setColor("#7fff00")
                .setTitle("Sudo")
                .setTimestamp()
                .setFooter("Xine Development", "https://i.imgur.com/2hrtmj5.png");
            if (args.length === 0)
            {
                embed.setDescription("Nothing for the bot to type");
                return message.channel.send(embed);
            }
            client.chat(args.join(" "));
            embed.setDescription(`Sent ${args.join(" ")} to the bot`);
            return message.channel.send(embed);
        }
    }
}