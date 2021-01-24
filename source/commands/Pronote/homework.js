const pronote = require('pronote-api');
const { ENCRYPT_KEY } = require("../../config")
const CryptoJs = require("crypto-js")
const { MessageEmbed, UserResolvable } = require("discord.js")

module.exports.run = async (client, message, args, settings) => {
    let session = null
    let userinfo = null
    let mension = message.mentions.users.array()
    if (mension.length) {
        userinfo = await client.getClientPronote(message.mentions.users.array()[0])
        if (!userinfo) {
            return message.channel.send("L'utilisateur n'as pas enregistré ces informations")
        }
        let decrypted = CryptoJs.AES.decrypt(userinfo.password, ENCRYPT_KEY);
        if (userinfo.cas) {
            session = await pronote.login(userinfo.link, userinfo.name, decrypted.toString(CryptoJs.enc.Utf8), userinfo.cas).catch(err => {
                if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                    message.channel.send("Vos identifiants sont incorrect")
                } else {
                    console.error(err);
                }
            })
        } else {
            session = await pronote.login(userinfo.link, userinfo.name, decrypted.toString(CryptoJs.enc.Utf8)).catch(err => {
                if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                    message.channel.send("Vos identifiants sont incorrect")
                } else {
                    console.error(err);
                }
            })
        }
    } else {
        userinfo = await client.getClientPronote(message.author)
        if (!userinfo) {
            return message.channel.send("L'utilisateur n'as pas enregistré ces information")
        }
        let decrypted = CryptoJs.AES.decrypt(userinfo.password, ENCRYPT_KEY);
        if (userinfo.cas) {
            session = await pronote.login(userinfo.link, userinfo.name, decrypted.toString(CryptoJs.enc.Utf8), userinfo.cas).catch(err => {
                if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                    message.channel.send("Vos identifiants sont incorrect")
                } else {
                    console.error(err);
                }
            })
        } else {
            session = await pronote.login(userinfo.link, userinfo.name, decrypted.toString(CryptoJs.enc.Utf8)).catch(err => {

                if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                    message.channel.send("Vos identifiants sont incorrect")
                } else {
                    console.error(err);
                }
            })
        }
    }

    let homeworks;
    if (mension.length) {
        if (args.length >= 3) {
            homeworks = await session.homeworks(new Date(args[1] + " " + args[0] + " " + args[2] + " " ), new Date(args[1] + " " + args[0] + " " + args[2] + " " ));
        } else if (args.length >= 2) {
            return require("../Misc/help").run(client, message, ["homework"], settings);
        } else {
            homeworks = await session.homeworks();
        }
    } else {
        if (args.length === 3) {
            homeworks = await session.homeworks(new Date(args[1] + " " + args[0] + " " + args[2] + " " ), new Date(args[1] + " " + args[0] + " " + args[2] + " " ));
        } else if (args.length >= 1) {
            return require("../Misc/help").run(client, message, ["homework"], settings);
        } else {
            homeworks = await session.homeworks();
        }
    }


    let fields = []
    homeworks.forEach(element => {
        fields.push({
            name: element.subject,
            value: "**Description:** "+element.description +"\n" +
                "**Pour le:** "+ element.for +"\n  ",
        })
    })
    let embed = new MessageEmbed({
        author: "Pronote",
        color: "#21A212",
        title: "Information Pronote / homeworks",
        url: userinfo.link
    }).addFields(fields)
    message.channel.send(embed)

}

module.exports.help = {
    name: 'homework',
    description: "Affiché les devoir d'un utilisateur",
    category: "pronote",
    aliases: ["hw", "homework", "homeworks"],
    usage: "<day> <mouth> <year>",
    args: false,
    permissions: false
}
