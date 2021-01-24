const {clientPronote} = require("../../Models/index")

module.exports.run = async (client, message, args) => {
    clientPronote.deleteOne({ idUserDiscord: message.author.id }).then(function(){
        message.channel.send("Toutes vos données ont bien était supprimées !")
    }).catch(function(error){
        message.channel.send("Une erreur est survenue lors de la suppression de vos données, merci de contacter Nather#0255")
        console.log(error); // Failure
    });
}

module.exports.help = {
    name: 'delete-data',
    description: "Permet de supprimer toutes les infos que le bots à sur vous",
    category: "bdd",
    args: false,
    aliases: ["delete", "data-delete", "datadelete", "deletedata"],
}
