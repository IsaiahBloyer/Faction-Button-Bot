const config = require("../../config.json");
const Discord = require("discord.js");
const fs = require("fs");

module.exports = 
{
    name: "whitelist",
    description: "lets users fire the bot from in-game chat",
    execute(message, args, client)
    {
        if (message.member.roles.cache.some(r => r.id === config.allowedRoleID))
        {
            let embed = new Discord.MessageEmbed()
                .setColor("#7fff00")
                .setTitle("Whitelist")
                .setTimestamp()
                .setFooter("Xine Development", "https://i.imgur.com/2hrtmj5.png");

            if (args.length == 0)
            {
                embed.setDescription("No argument found. Please use ``.whitelist add`` to whitelist yourself");
                return message.channel.send(embed);
            }
            else if (args[0].toLowerCase() === "add")
            {
                let key = "I-", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", authData = "";
                for (let i = 0; i < 65; i++)
                {
                    key += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                fs.readFile("./util/auth.db", "utf8", (err, data) =>
                {
                    authData = JSON.parse(data);
                    for (let i = 0, num = authData.length; i < num; i++)
                    {
                        if (authData[i][0] === message.author.id)
                        {
                            embed.setDescription("You are already added to the whitelist or need to verify in-game!");
                            return message.channel.send(embed);
                        }
                    }
                    authData.push([message.author.id, key]);
                    try 
                    {
                        let dmembed = new Discord.MessageEmbed()
                            .setColor("#7fff00")
                            .setTitle("Whitelist")
                            .setTimestamp()
                            .setFooter("Xine Development", "https://i.imgur.com/2hrtmj5.png")
                            .setDescription(`Your Bot Whitelist Request was Successful!\nPlease message ${client.username} the bot in-game the following code in the block:\n\n\`\`${key}\`\`\n\nThank you!`);
                        message.author.send(dmembed);
                    }
                    catch (error)
                    {
                        return message.channel.send("Error! Please make sure that your DMs are on so that I may DM you the verification key!");
                    }
                    fs.writeFileSync("./util/auth.db", JSON.stringify(authData, null, 4));
                    embed.setDescription("Success! Check your DMs from me!");
                    return message.channel.send(embed);
                });
            }
            else if (args[0].toLowerCase() === "remove")
            {
                fs.readFile("./util/auth.db", "utf8", (err, data) =>
                {
                    authData = JSON.parse(data);
                    for (let i = 0, num = authData.length; i < num; i++)
                    {
                        if (authData[i][0] === message.author.id)
                        {
                            authData.splice(i);
                            fs.writeFileSync("./util/auth.db", JSON.stringify(authData, null, 4));
                            embed.setDescription("You were removed from the whitelist");
                            return message.channel.send(embed);
                        }
                    }
                    embed.setDescription("You are not currently on the whitelist");
                    return message.channel.send(embed);
                });
            }
        }
    }
}