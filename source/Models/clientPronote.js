const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    link: String,
    name: String,
    password: String,
    username: String,
    cas: {type: String, required: false},
    idUserDiscord: String
});

module.exports = mongoose.model("Pronote", guildSchema);
