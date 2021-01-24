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

    let fields = []
    const marks = await session.marks();
    if (args.length > 1 || (mension.length === 0 && args.length === 1)) {
        marks.subjects.forEach(element => {
            let name = element.name.replace(" ", "-")
            if (name.toLowerCase() === args[args.length -1] || name === args[args.length -1]) {
                element.marks.forEach(note => {
                    fields.push({
                        name: note.title,
                        value: "Note de l'élève : "+note.value+"/"+note.scale+"\n Note Moyenne de la Classe : "+note.average+"/"+note.scale+"\n Coefficient: "+note.coefficient+"\n Date: "+note.date,
                    })
                })
            }
        })
    } else {
        fields = [{
            name: "Général",
            value: "Moyenne de l'élève : "+marks.averages.student+"\n Moyenne de la Classe : "+ marks.averages.studentClass
        }]
        marks.subjects.forEach(element => {
            fields.push({
                name: element.name,
                value: "Moyenne de l'élève : "+element.averages.student+"\n Moyenne de la Classe : "+ element.averages.studentClass+"\n Moyenne max: "+element.averages.max+"\n Moyenne min: "+element.averages.min,
            })
        })
    }


    let embed = new MessageEmbed({
        author: "Pronote",
        color: "#21A212",
        title: "Information Pronote / Note",
        url: userinfo.link
    }).addFields(fields)

    message.channel.send(embed)

}

module.exports.help = {
    name: 'note',
    description: "Affiché les note d'un utilisateur",
    category: "pronote",
    args: false,
    cooldown: 15,
    usage: "<user> <Matière>",
    aliases: ["note", "notes", "n"],
    permissions: false,
}
