const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {
    const dmMessage = await message.author.createDM()
    dmMessage.send("Merci de renseigner les information suivante en suivant là formation suivante `?pronote link namePronote passwordPronote (cas)` \nexemple: `?pronote https://kjbsdfkhb.index-education.net/pronote/ JeSuisUnEtudiant EtMonModpEstSa`")
    let embed = new MessageEmbed({
        author: "CAS pronote",
        color: "#21A212",
        title: "CAS pronote",
        description: "Si vous pouvez vous connecter directement sur l'interface de Pronote, l'API devrait fonctionner PEU IMPORTE VOTRE ACADÉMIE \n \n Sinon, l'API propose de se connecter à Pronote avec des comptes des académies suivantes :"
    }).addFields({
        name: "Académie d'Orleans-Tours",
        value: "ac-orleans-tours"
    }, {
        name: "Académie de Besançon",
        value: "ac-besancon"
    }, {
        name: "Académie de Bordeaux",
        value: "ac-bordeaux"
    }, {
        name: "Académie de Caen",
        value: "ac-caen"
    }, {
        name: "Académie de Clermont-Ferrand",
        value: "ac-clermont"
    }, {
        name: "Académie de Dijon",
        value: "ac-dijon"
    }, {
        name: "Académie de Grenoble",
        value: "ac-grenoble"
    }, {
        name: "Académie de Lille",
        value: "ac-lille"
    }, {
        name: "Académie de Limoges",
        value: "ac-limoges"
    }, {
        name: "Académie de Lyon",
        value: "ac-lyon"
    }, {
        name: "Académie de Montpellier",
        value: "ac-montpellier"
    }, {
        name: "Académie de Nancy-Metz",
        value: "ac-nancy-metz"
    }, {
        name: "Académie de Nantes",
        value: "ac-nantes"
    }, {
        name: "Académie de Poitiers",
        value: "ac-poitiers"
    }, {
        name: "Académie de Reims",
        value: "ac-reims"
    }, {
        name: "Académie de Rouen (Arsene76)",
        value: "arsene76"
    }, {
        name: "Académie de Rouen",
        value: "ac-rouen"
    }, {
        name: "Académie de Strasbourg",
        value: "ac-strasbourg"
    }, {
        name: "Académie de Toulouse",
        value: "ac-toulouse"
    }, {
        name: "ENT \"Agora 06\" (Nice)",
        value: "agora06"
    }, {
        name: "ENT \"Haute-Garonne\"",
        value: "haute-garonne"
    }, {
        name: "ENT \"Hauts-de-France\"",
        value: "hdf"
    }, {
        name: "ENT \"La Classe\" (Lyon)",
        value: "laclasse"
    }, {
        name: "ENT \"Lycee Connecte\" (Nouvelle-Aquitaine)",
        value: "lyceeconnecte"
    }, {
        name: "ENT \"Seine-et-Marne\"",
        value: "seine-et-marne"
    }, {
        name: "ENT \"Somme\"",
        value: "somme"
    }, {
        name: "ENT \"Toutatice\" (Rennes)",
        value: "toutatice"
    }, {
        name: "ENT \"Île de France\"",
        value: "iledefrance"
    }, {
        name: "ENT \"Lycee Jean Renoir Munich\"",
        value: "ljr-munich"
    }, {
        name: "ENT \"L'eure en Normandie\"",
        value: "Eure-Normandie"
    },)
    dmMessage.send(embed)
}

module.exports.help = {
    name: 'connect',
    description: "Connecté un compte discord à pronote",
    category: "pronote",
    args: false,
    aliases: ["co"],
    permissions: false,
    permission: []
}
