const mongoose = require("mongoose");
const { Guild, clientPronote } = require("../Models/index")

module.exports = async client => {
    client.createGuild = async guild => {
        const merged = Object.assign({_id: mongoose.Types.ObjectId()}, guild);
        const createGuild = await new Guild(merged)
        createGuild.save().then(g => console.log(`Nouveau server -> ${g.guildName}`));
    }

    client.getGuild = async guild => {
        if (guild) {
            const data = await Guild.findOne({guildID: guild.id});
            if (data) return data;
            return client.config.DEFAULTSETTING;
        }
        return client.config.DEFAULTSETTING;
    }

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);

        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings)
    }
    // Pronote
    client.createClientPronote = async clientPronot => {
        const merged = Object.assign({_id: mongoose.Types.ObjectId()}, clientPronot);
        const createClientPronote = await new clientPronote(merged)
        createClientPronote.save().then(g => console.log(`Nouveau client Pronote -> ${clientPronot.name}`));
    }

    client.getClientPronote = async user => {
        const data = await clientPronote.findOne({idUserDiscord: user.id});
        if (data) return data;
        return false
    }

    client.updateClientPronote = async (user, settings) => {
        let data = await client.getClientPronote(user);

        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings)
    }
}
