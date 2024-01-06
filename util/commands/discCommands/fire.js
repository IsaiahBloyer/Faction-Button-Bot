const config = require("../../config.json");
const Discord = require("discord.js");
const cron = require("node-cron");
const fs = require("fs");

let fire = (client) => 
{
    try
    {
        client.activateBlock(client.findBlock({matching: 77}));
    }
    catch (error)
    {
        try
        {
            client.activateBlock(client.findBlock({matching: 143}));
        }
        catch (error)
        {
            try
            {
                client.activateBlock(client.findBlock({matching: 69}));
            }
            catch (error)
            {
                client.chat("/ff I COULDN'T FIRE THE CANNON! WHERE'S THE BUTTON OR LEVER");
                return false;
            }
        }
    }
    client.chat("/ff FIRED THE CANNON");
    return true;
}

let task = cron.schedule('*/3 * * * * * *', () =>
{
    console.log("to do");
    if (!config.firing)
    {
        task.stop();
    }
},
{
    scheduled: false
});

module.exports =
{
    name: "fire",
    description: "forces the bot to right-click the button",
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
                embed.setDescription(fire(client) ? "Successfully fired the cannon!" : "Error! Could not find a button or a lever near the bot!");
                return message.channel.send(embed);
            }
            else if (args[0].toLowerCase() === "loop")
            {
                if (args[1].toLowerCase() === "on" || args[1].toLowerCase() === "true")
                {
                    task.start();
                    config.firing = true;
                    fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                    console.log("on");
                }
                else if(args[1].toLowerCase() === "off" || args[1].toLowerCase() === "false")
                {
                    config.firing = false;
                    fs.writeFileSync("./util/config.json", JSON.stringify(config, null, 4));
                    console.log("off");
                }
                embed.setDescription("looping place holder");
                return message.channel.send(embed);
            }
            else if (parseInt(args[0], 10))
            {
                let num = parseInt(args[0], 10), fired = 0, failed = 0, i;
                embed.setDescription(`Starting to fire the cannon ${num} times`);
                message.channel.send(embed);
                for (i = 0; i < num; i++)
                {
                    setTimeout(() =>
                    {
                        if (fire(client))
                        {
                            fired++;
                        }
                        else
                        {
                            failed++;
                        }
                    }, config.cannonSpeed * 1000 * i);
                }
                setTimeout(() =>
                {
                    embed.setDescription(failed > 0 ? `Successfully fired the cannon ${fired} times but couldn't fire the cannon ${failed} times!` : `Successfully fired the cannon ${fired} times!`);
                    return message.channel.send(embed);
                }, (config.cannonSpeed * 1000 * i) + 500);
            }
            else
            {
                embed.setDescription("Invalid Syntax!")
                return message.channel.send(embed);
            }
        }
    }
}