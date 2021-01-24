const {  Collection, MessageEmbed } = require("discord.js");

module.exports = async (client, message) =>  {

    const settings = client.config.DEFAULTSETTING;
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;


    const args = message.content.slice(settings.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.dmCommands.get(commandName) || client.dmCommands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    if (!command) return;

    if (command.help.args && !args.length) {
        let noArgsReply = `il nous faut des arguments pour cette command, ${message.author}`;

        if (command.help.usage) noArgsReply +=`\nVoici comment utiliser la commande: \`${settings.prefix}${command.help.name} ${command.help.usage}\``;

        return message.channel.send(noArgsReply);
    }

    command.run(client, message, args, settings)
}
