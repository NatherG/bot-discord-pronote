const { MessageEmbed, TextChannel } = require("discord.js");

module.exports = (client, member) => {
    const channel = member.guild.channels.resolve(client.welcome_channel.get(member.guild.id))

    if(channel instanceof TextChannel) {
        const embed = new MessageEmbed()
            .setTitle('Une personne est partie.')
            .addField('Aurevoir ' + member.displayName, 'Nous sommes déçu de te voir partir', true)
            .setDescription("Si tu as besoin d'aide n'hésite pas !")
            .setColor("BB0B0B")
            .setTimestamp()
        channel.send(embed)
    }
}