const { PREFIX, ENCRYPT_KEY } = require("../../config");
const CryptoJs = require("crypto-js")

module.exports.run = async (client, message, args) => {
    const userinfo = await client.getClientPronote(message.author)
    if (userinfo) {
        return message.channel.send("L'utilisateur est déjà enregistré")
    }
    const newClient = {
        link: args[0],
        name: args[1],
        password: CryptoJs.AES.encrypt(args[2], ENCRYPT_KEY),
        username: message.author.username,
        cas: (args[3] ? args[3] : null),
        idUserDiscord: message.author.id
    };

    await client.createClientPronote(newClient).then(() => {
        message.channel.send("Vous avez bien était enregistré")
    })
}

module.exports.help = {
    name: 'connect',
    description: "Permet de relier sont compte discord à pronote",
    category: "pronote",
    args: true,
    aliases: ["con", "conect"],
    usage: "<link> <username Pronote> <password>",
}
