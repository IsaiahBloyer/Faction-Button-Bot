module.exports = (user, msg, client) =>
{
    let array = msg.split(" ");
    array.shift();
    if (array.length === 0)
    {
        return client.chat(`/msg ${user} You didn't tell me what to type`);
    }
    try
    {
        client.chat(array.join(" "));
    }
    catch (err)
    {
        console.log(err);
    }
}