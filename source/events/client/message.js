const { User, Collection } = require("discord.js");

module.exports = async (client, message) =>  {

    if (message.channel.type === "dm") {
        client.emit("messagedm", message )
        return;
    }
    const settings = await client.getGuild(message.guild)
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;


    const args = message.content.slice(settings.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));



    if (!command) return;

    if (command.help.permissions && message.mentions.users.first()) {
        let boolean = false;
        let messagecmd ="";
        for (let i = 0; i < command.help.permission.length; i++) {
            if (!message.member.hasPermission(command.help.permission[i])) {
                boolean = true;
                messagecmd = `Vous n'avez pas les permissions pour utilisez cette commande! ${message.author}`
            }
            if (message.guild.member(message.mentions.users.first()).hasPermission(command.help.permission[i])) {
                boolean = true;
                messagecmd = `vous ne pouvais pas faire cette commande sur cette utilisateur( ${message.mentions.users.first()} )! `
            }
        }
        if (boolean) {
            return message.reply(messagecmd);
        }
    }

    if (command.help.args && !args.length) {
        let noArgsReply = `il nous faut des arguments pour cette command, ${message.author}`;

        if (command.help.usage) noArgsReply +=`\nVoici comment utiliser la commande: \`${settings.prefix}${command.help.name} ${command.help.usage}\``;

        return message.channel.send(noArgsReply);
    }

    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection())
    }
    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || client.config.cooldown) * 1000;

    if (tStamps.has(message.author.id) && !message.member.hasPermission("ADMINISTRATOR")) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if (timeNow < cdExpirationTime) {
            timeleft = (cdExpirationTime - timeNow) /1000;
            return message.reply(`Merci d'attendre ${timeleft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\``)
        }
    }

    tStamps.set(message.author.id, timeNow)
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    try {
        command.run(client, message, args, settings)
    } catch (e) {
        console.log(e)
    }

}
