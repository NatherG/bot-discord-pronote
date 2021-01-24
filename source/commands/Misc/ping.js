module.exports.run = (client, message, args) => {
    message.channel.send('pong')
}

module.exports.help = {
    name: 'ping',
    description: "Renvoie pong !",
    category: "misc",
    aliases: ["ping"],
    args: false,
    permissions: false
}
