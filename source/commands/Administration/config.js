module.exports.run = async (client, message, args, settings) => {
    const getSetting = args[0];
    const newSetting = args.splice(1).join(" ");

    switch (getSetting) {
        case "prefix": {
            if (newSetting){
                await client.updateGuild(message.guild, {prefix: newSetting})
                return message.channel.send(`Prefix mis à jour: \`${settings.prefix}\` -> \`${newSetting}\``)
            }
            message.channel.send(`Prefix actuel \`${settings.prefix}\``);
            break;
        }
        case "logChannel": {
            if (newSetting){
                await client.updateGuild(message.guild, {logChannel: newSetting})
                return message.channel.send(`logChannel mis à jour: \`${settings.logChannel}\` -> \`${newSetting}\``)
            }
            message.channel.send(`logChannel actuel \`${settings.logChannel}\``);
            break;
        }
        case "guildCooldown": {
            if (newSetting){
                await client.updateGuild(message.guild, {guildCooldown: newSetting})
                return message.channel.send(`guildCooldown mis à jour: \`${settings.guildCooldown}\` -> \`${newSetting}\``)
            }
            message.channel.send(`guildCooldown actuel \`${settings.guildCooldown}\``);
            break;
        }
        case "guildClearChat": {
            if (newSetting){
                await client.updateGuild(message.guild, {guildClearChat: newSetting})
                return message.channel.send(`guildClearChat mis à jour: \`${settings.guildClearChat}\` -> \`${newSetting}\``)
            }
            message.channel.send(`guildClearChat actuel \`${settings.guildClearChat}\``);
            break;
        }
    }


}

module.exports.help = {
    name: 'config',
    description: "modifie la base de données",
    category: "administration",
    args: true,
    aliases: ["config"],
    usage: '<key> <value>',
    permissions: true,
    permission: ["ADMINISTRATOR"]
}
