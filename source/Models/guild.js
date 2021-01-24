const mongoose = require("mongoose");
const { DEFAULTSETTING: defaults } = require("../config");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    guildCooldown: {
        "type": Number,
        "default": defaults.cooldown
    },
    guildClearChat: {
        "type": Number,
        "default": defaults.clearChat
    },
    prefix: {
        "type": String,
        "default": defaults.prefix
    },
    logChannel: {
        "type": String,
        "default": defaults.logChannel
    },
});

module.exports = mongoose.model("Guild", guildSchema);