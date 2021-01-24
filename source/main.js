const { Client, Collection } = require("discord.js");
const { TOKEN } = require("./config");
const { readdirSync } = require("fs")

const client = new Client();
require("./util/function")(client)
client.config = require("./config")
client.mongoose = require("./util/mongoose");
["commands","dmCommands", 'cooldowns', 'welcome_channel'].forEach(x => client[x] = new Collection());

const loadCommands = (dir = "./commands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.commands.set(getFileName.help.name, getFileName)
            console.log(`Command chargée: ${getFileName.help.name}`)
        }
    })
}

const loadDmCommands = (dir = "./dmCommands/") => {
    readdirSync(dir).forEach(dirs => {
        const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const file of commands) {
            const getFileName = require(`${dir}/${dirs}/${file}`);
            client.dmCommands.set(getFileName.help.name, getFileName)
            console.log(`dmCommand chargée: ${getFileName.help.name}`)
        }
    })
}

const loadEvents = (dir = "./events/") => {
    readdirSync(dir).forEach(dirs => {
        const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

        for (const event of events) {
            const evt = require(`${dir}/${dirs}/${event}`);
            const evtName = event.split(".")[0];
        client.on(evtName, evt.bind(null, client))
        console.log(`Evenement chargé: ${evtName}`)
        }
    })
}

loadCommands();
loadDmCommands();
loadEvents();

client.mongoose.init()

client.login(client.config.TOKEN)
