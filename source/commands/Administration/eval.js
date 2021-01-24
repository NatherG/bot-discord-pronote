module.exports.run = async (client, message, args) => {
    function clean(text) {
        if (typeof text === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text;
    }

    const code = args.join(" ");
    const evaled = eval(code);
    const cleanCode = await clean(evaled);
    message.channel.send(cleanCode, { code: "js" });
};

module.exports.help = {
    name: 'eval',
    description: "test un code javascript",
    category: "administration",
    args: true,
    aliases: ["eval"],
    permissions: true,
    permission: ["ADMINISTRATOR"]
}
