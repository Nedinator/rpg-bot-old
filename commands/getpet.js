const Discord = require('discord.js')
const randomName = require('node-random-name');
const Pet = require("../models/pets.js");
const Coins = require("../models/coins.js");

module.exports.run = async (bot, message, args) => {
    //this is where the actual code for the command goes
    await message.delete();
    let name = randomName({
        first: true
    });
    Pet.findOne({
        ownerID: message.author.id
    }, (err, res) => {
        if (err) console.log(err);
        if (!res) {
            Coins.findOne({
                userID: message.author.id,
                serverID: message.guild.id
            }, (err, coins) => {
                if (err) console.log(err)
                if (!coins) return message.reply("Sorry, you don't have any coins.");
                if (coins.coins < 1000) return message.reply("Sorry, you need 1000 coins to buy a pet.")
                coins.coins = coins.coins - 1000;
                coins.save().catch(err => console.log(err));
            })
            const newDoc = new Pet({
                petName: name,
                ownerID: message.author.id,
                ownerUsername: message.author.username,
            })
            let embed = new Discord.RichEmbed()
                .setTitle("Pet Spawned!")
                .setColor("BLURPLE")
                .setThumbnail(message.author.displayAvatarURL)
                .addField("Pet Name", name)
                .addField("XP/LVL: ", "0/1");

            message.channel.send(embed);
            newDoc.save().catch(err => console.log(err));
        } else {
            return message.reply("Sorry, you already have a pet named " + res.petName + ".").then(r => r.delete(5000))
        }
    })
}

//name this whatever the command name is.
module.exports.help = {
    name: 'getpet'
}
