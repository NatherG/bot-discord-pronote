const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync("./commands");

module.exports.run = (client, message, args, settings) => {
    if (!args.length) {
        const embed = new MessageEmbed()
            .setColor("#21A212")
            .addField(`Liste des commandes`, `Une liste de toutes les sous-catégories disponilbles et leur commandes.\\nPour plus d'informations sur une commande, tapez \`${settings.prefix}help < command_name >\``)

        for (const category of categoryList) {
            let command = client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => {
                if (!(cmd.help.permissions && !message.member.hasPermission(cmd.help.permission))) {
                    return cmd.help.name;
                } else {
                    return "";
                }
            }).join(", ")
            if (command.replace(", ", "") !== "") {
                embed.addField(
                    `${category}`,
                    `${command}`
                )
            }
        }
    return message.channel.send(embed)
    } else {
        const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

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
    description: "Renvoie une liste de commands ou les informations sur une seule !",
    category: "misc",
    args: false,
    aliases: ["help"],
    usage: "<command_name>",
    permissions: false
};
