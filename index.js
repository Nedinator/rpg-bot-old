//First thing we need... const modules!
const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");

// Here I const files
const config = require("./config.json");
const token = require("./token.json");
const Coins = require("./models/coins.js");

const bot = new Discord.Client();

bot.commands = new Discord.Collection();

mongoose.connect('mongodb://localhost/nedrpg', {
    useNewUrlParser: true
});


fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", () => {
    bot.user.setActivity("!help", {
        type: "PLAYING"
    })
    console.log(bot.user.username + " is online.")
});

bot.on("message", async message => {
    if (message.author.bot) return;

    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;

    if (command.startsWith(prefix)) {

        let commandfile = bot.commands.get(command.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args);
    } else {
        if (message.channel.type === 'dm') return;
        let chance = Math.floor(Math.random() * 100) + 1;
        if (chance > 50) {
            //here is where the coins are added.

            let coinstoadd = Math.ceil(Math.random() * 10) + 5;

            Coins.findOne({
                userID: message.author.id,
                serverID: message.guild.id
            }, (err, res) => {
                if (err) console.log(err);

                if (!res) {
                    const newDoc = new Coins({
                        userID: message.author.id,
                        username: message.author.username,
                        serverID: message.guild.id,
                        coins: coinstoadd
                    })
                    newDoc.save().catch(err => console.log(err));
                } else {
                    res.coins = res.coins + coinstoadd;
                    res.save().catch(err => console.log(err))
                }
            })
        }
    }
});

bot.login(token.token)
