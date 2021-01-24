const pronote = require('pronote-api');
const { ENCRYPT_KEY } = require("../../config")
const CryptoJs = require("crypto-js")
const { MessageEmbed, UserResolvable } = require("discord.js")

module.exports.run = async (client, message, args) => {
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
            session = await pronote.login(userinfo.link, userinfo.name, decrypted.toString(CryptoJs.enc.Utf8), userinfo.cas ).catch(err => {
                if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                    message.channel.send("Vos identifiants sont incorrect")
                } else {
                    console.error(err);
                }
            })
        } else {
            session = await pronote.login(userinfo.link, userinfo.name, decrypted.toString(CryptoJs.enc.Utf8) ).catch(err => {
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
            session = await pronote.login(userinfo.link, userinfo.name, decrypted.toString(CryptoJs.enc.Utf8), userinfo.cas ).catch(err => {
                if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                    message.channel.send("Vos identifiants sont incorrect")
                } else {
                    console.error(err);
                }
            })
        } else {
            session = await pronote.login(userinfo.link, userinfo.name, decrypted.toString(CryptoJs.enc.Utf8) ).catch(err => {

                if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
                    message.channel.send("Vos identifiants sont incorrect")
                } else {
                    console.error(err);
                }
            })
        }
    }

    let timatable = await session.timetable()
    let fields = []

    timatable.forEach(time => {
        fields.push({
            name: time.subject,
            value: `Professeur: ${time.teacher} \n Salle: ${time.room} \n De ${time.from.getHours()}h${time.from.getMinutes()} à ${time.to.getHours()}h${time.from.getMinutes()}`
        })
    })
    let embed = new MessageEmbed({
        author: "Pronote",
        color: "#21A212",
        title: "Information Pronote / timetable",
        url: userinfo.link
    }).addFields(fields)

    message.channel.send(embed)
}

module.exports.help = {
    name: 'timetable',
    description: "Affiché les prochains cours d'un utilisateur",
    category: "pronote",
    args: false,
    usage: "<user>",
    aliases: ["timetable", "tt", "time"],
    permissions: false,
    permission: []
}
