const MinecraftAPI = require("minecraft-api");
const fs = require("fs");
const sudo = require("./commands/gameCommands/sudo");
const fire = require("./commands/gameCommands/fire");

module.exports =
{
    searchDB: (user, msg, client) =>
    {
        let uuid = null;
        MinecraftAPI.uuidForName(user).then(id => uuid = id);
        setTimeout(() =>
        {
            fs.readFile("./util/auth.db", "utf8", (err, data) =>
            {
                if (err)
                {
                    return console.log("The auth.db file isn't in the util folder!");
                }
                let db = JSON.parse(data);
                for (let i = 0, num = db.length; i < num; i++)
                {
                    if (uuid === db[i][1])
                    {
                        let array = msg.split(" ");
                        let arg = array[0];
                        switch (arg.toLowerCase())
                        {
                            case `sudo`:
                                return sudo(user, msg, client);
                            case `fire`:
                                return fire(user, msg, client);
                        }
                        break;
                    }
                }
            });
        }, 500);
    },

    addDB: (user, msg, client) =>
    {
        let array = msg.split(" ");
        let arg = array[0];
        if (!arg.startsWith("I-") || arg.length !== 67)
        {
            return;
        }
        fs.readFile("./util/auth.db", "utf8", (err, data) =>
        {
            if (err)
            {
                return console.log("The auth.db file isn't in the util folder!");
            }
            let db = JSON.parse(data);
            for (let i = 0, num = db.length; i < num; i++)
            {
                if (arg === db[i][1])
                {
                    let uuid = null;
                    MinecraftAPI.uuidForName(user).then(id => uuid = id);
                    setTimeout(() =>
                    {
                        db[i][1] = uuid;
                        fs.writeFileSync("./util/auth.db", JSON.stringify(db, null, 4));
                        client.chat(`/msg ${user} You have been whitelisted!`);
                    }, 500);
                    return;
                }
            }
        });
    }
}