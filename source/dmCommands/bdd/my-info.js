const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    const userinfo = await client.getClientPronote(message.author)
    if (!userinfo) {
        return message.channel.send("Information introuvée ! ")
    }
    const embed = new MessageEmbed().addFields([{
        name: "Link",
        value: userinfo.link,
        inline: false
    }, {
        name: "Name",
        value: userinfo.name,
        inline: true
    }, {
        name: "password",
        value: userinfo.password,
        inline: true
    }, {
        name: "username",
        value: userinfo.username,
        inline: false
    }, {
        name: "idUserDiscord",
        value: userinfo.idUserDiscord,
        inline: true
    }])
    await message.channel.send(embed)
}

module.exports.help = {
    name: 'my-info',
    description: "Renvoie toutes les informations que la base de donné possède sur cette utilisateur",
    category: "bdd",
    args: false,
    aliases: ["info", "minfo"],
    usage: "<texte>",
}
