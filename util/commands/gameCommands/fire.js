const config = require("../../config.json");

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

module.exports = (user, msg, client) =>
{
    let array = msg.split(" ");
    if (array[1] === undefined)
    {
        client.chat(`/msg ${user} Firing the cannon`);
        fire(client);
    }
    else if (parseInt(array[1], 10))
    {
        let fired = 0, failed = 0, i;
        client.chat(`/msg ${user} Firing the cannon ${parseInt(array[1], 10)} times`);
        for (i = 0, num = parseInt(array[1], 10); i < num; i++)
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
            client.chat(failed > 0 ? `/msg ${user} Successfully fired the cannon ${fired} times but couldn't fire the cannon ${failed} times` : `/msg ${user} Successfully fired the cannon ${fired} times`);
        }, (config.cannonSpeed * 1000 * i));
    }
    
}