const pronote = require('pronote-api');
const { ENCRYPT_KEY } = require("../../config")
const CryptoJs = require("crypto-js")
const { MessageEmbed } = require("discord.js")

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
    let marks = await session.marks()
    let absences = await session.absences()
    let timetable = await session.timetable()

    let embed = new MessageEmbed({
        author: "Pronote",
        color: "#21A212",
        title: "Information Pronote",
        url: userinfo.link
    }).addFields([{
        name: "Nom prénom",
        value: session.user.name,
        inline: true
    }, {
        name: "Classe",
        value: session.user.studentClass.name,
        inline: true
    }, {
        name: "Etablissement",
        value: session.params.establishment,
        inline: false
    }, {
        name: "Moyenne de l'élève",
        value: marks.averages.student,
        inline: true
    }, {
        name: "Moyenne de classe",
        value: marks.averages.studentClass,
        inline: true
    } ,{
        name: "Prochaines heures",
        value: timetable.length,
        inline: false
    }]).setThumbnail(session.user.avatar)
    try {
        embed.addFields({
            name: "Absence",
            value: absences.absences[0].hours,
            inline: false
        })
    } catch (e) {

    }
    message.channel.send(embed)

}

module.exports.help = {
    name: 'pronote',
    description: "Affiché les inforamtions principale disponible sur pronote",
    category: "pronote",
    args: false,
    cooldown: 10,
    usage: "<user>",
    aliases: ["pronote"],
    permissions: false,
    permission: []
}
