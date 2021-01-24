const { MessageEmbed, TextChannel } = require("discord.js");

module.exports = (client, member) => {
    const channel = member.guild.channels.resolve(client.welcome_channel.get(member.guild.id))

    if(channel instanceof TextChannel) {
        const embed = new MessageEmbed()
            .setTitle('Une personne est arrivée.')
            .addField('Bienvenue ' + member.displayName, 'Nous sommes heureux de te voir ici !', true)
            .setDescription("Si tu as besoin d'aide n'hésite pas !")
            .setColor("#34c924")
            .setTimestamp()
        channel.send(embed)
    }
}