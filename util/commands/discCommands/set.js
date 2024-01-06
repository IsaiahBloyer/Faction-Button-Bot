let config = require("../../config.json");
const Discord = require("discord.js");
const fs = require("fs");

module.exports =
{
    name: "set",
    description: "adds ability to change certain settings on the bot",
    execute(message, args, client)
    {
        if (message.member.roles.cache.some(r => r.id === config.allowedRoleID))
        {
            let embed = new Discord.MessageEmbed()
                .setColor("#7fff00")
                .setTitle("Settings")
                .setTimestamp()
                .setFooter("Xine Development", "https://i.imgur.com/2hrtmj5.png");
            if (args.length === 0)
            {
                embed.setDescription("You didn't specify what settings to change");
                return message.channel.send(embed);
            }
            else if (args[0].toLowerCase() === "serverip" || args[0].toLowerCase() === "server" || args[0].toLowerCase() === "ip")
            {
                config.serverIP = args[1];
                fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                embed.setDescription(`Set the server ip to ${args[1]}`);
                return message.channel.send(embed);
            }
            else if (args[0].toLowerCase() === "prefix")
            {
                config.prefix = args[1];
                fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                embed.setDescription(`Set the bot's prefix to ${args[1]}`);
                return message.channel.send(embed);
            }
            else if (args[0].toLowerCase() === "role")
            {
                config.allowedRoleID = args[1];
                fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                embed.setDescription(`Set the allowed role for the bot to <@&${args[1]}>`);
                return message.channel.send(embed);
            }
            else if ((`${args[0].toLowerCase()} ${args[1].toLowerCase() }`) === "join command")
            {
                let cmd = "";
                if (args[3] === undefined)
                {
                    cmd = args[2];
                }
                else
                {
                    cmd = `${args[2]} ${args[3]}`;
                }
                config.joinCommand = cmd;
                fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                embed.setDescription(`Set the join command for the bot to ${cmd}`);
                return message.channel.send(embed);
            }
            else if (args[0].toLowerCase() === "gravity")
            {
                config.gravity = args[1];
                if (args[1].toLowerCase() === "true")
                {
                    client.physics.gravity = 27;
                    config.gravity = true;
                }
                else if (args[1].toLowerCase() === "false")
                {
                    client.physics.gravity = 0;
                    config.gravity = false;
                }
                else
                {
                    embed.setDescription(`Invalid option! You must either choose true or false`);
                    return message.channel.send(embed);
                }
                fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                embed.setDescription(`Set the bot's gravity to ${args[1]}`);
                return message.channel.send(embed);
            }
            else if ((`${args[0].toLowerCase()} ${args[1].toLowerCase() }`) === "cannon speed")
            {
                config.gravity = args[2];
                fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                embed.setDescription(`Set the cannon speed to ${args[2]}`);
                return message.channel.send(embed);
            }
            else if ((`${args[0].toLowerCase()} ${args[1].toLowerCase() }`) === "server version")
            {
                config.gravity = args[2];
                fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                embed.setDescription(`Set the server version to ${args[2]}`);
                return message.channel.send(embed);
            }
            else
            {
                embed.setDescription(`Unknown option!`);
                return message.channel.send(embed);
            }
        }
    }
}