module.exports.run = (client, message, args) => {
    message.channel.send(args.join(" "))
}

module.exports.help = {
    name: 'say',
    description: "Renvoie les arguments de la commands",
    category: "misc",
    args: true,
    cooldown: 10,
    aliases: ["rep", "say"],
    usage: "<texte>",
    permissions: false
}
