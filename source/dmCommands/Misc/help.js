const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync("./dmCommands");

module.exports.run = (client, message, args, settings) => {
    if (!args.length) {
        const embed = new MessageEmbed()
            .setColor("#21A212")
            .addField(`Liste des commandes`, `Une liste de toutes les sous-catégories disponilbles et leur commandes.\\nPour plus d'informations sur une commande, tapez \`${settings.prefix}help < command_name >\``)

        for (const category of categoryList) {
            embed.addField(
                `${category}`,
                `${client.dmCommands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(", ")}`
            )
        }
    return message.channel.send(embed)
    } else {
        const command = client.dmCommands.get(args[0]) || client.dmCommands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

        const embed = new MessageEmbed()
            .setColor("#21A212")
            .setTitle(`\`${command.help.name}\``)
            .addField("Description", `${command.help.description}`)
            .addField("Utilisation", command.help.usage ? `${settings.prefix}${command.help.name} ${command.help.usage}` : `${settings.prefix}${command.help.name}`, true)
        if (command.help.aliases > 1) embed.addField("Alias", command.help.aliases.join(","), true)
        if (command.help.cooldown) embed.addField("Cooldown", command.help.cooldown, true)
        return message.channel.send(embed)
    }
};

module.exports.help = {
    name: 'help',
    description: "Renvoie une liste de dmCommands ou les informations sur une seule !",
    category: "misc",
    args: false,
    aliases: ["help"],
    usage: "<command_name>",
};
