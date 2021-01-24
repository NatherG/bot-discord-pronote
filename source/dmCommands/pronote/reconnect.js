const { PREFIX, ENCRYPT_KEY } = require("../../config");
const CryptoJs = require("crypto-js")

module.exports.run = async (client, message, args) => {

    if (args[0].toLowerCase() === "name") {
        await client.updateClientPronote(message.author, {name: args[1]})
        return message.channel.send("L'identifiant pronote à bien était modifié")
    } else if (args[0].toLowerCase() === "link") {
        await client.updateClientPronote(message.author, {link: args[1]})
        return message.channel.send("Le lien vers votre pronote à bien était modifié")
    } else if (args[0].toLowerCase() === "password") {
        await client.updateClientPronote(message.author, {password: CryptoJs.AES.encrypt(args[1], ENCRYPT_KEY)})
        return message.channel.send("Le mot de passe à bien était modifié")
    } else {
        return message.channel.send("Le paramètre à changer n'est pas spécifier ou mal spécifier (`name`, `link`, `password`)")
    }
}

module.exports.help = {
    name: 'reconnect',
    description: "Permet de modifier les identifiant pronote avec les key => (`name`, `link`, `password`)",
    category: "pronote",
    args: true,
    aliases: ["con", "conect"],
    usage: "<key> <identifiant>",
}
