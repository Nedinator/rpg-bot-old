const Discord = require('discord.js')
const Pet = require("../models/pets.js")
const Coins = require("../models/coins.js");
const randomName = require("node-random-name")

module.exports.run = async (bot, message, args) => {
    //this is where the actual code for the command goes
    await message.delete();
    Pet.findOne({
        ownerID: message.author.id
    }, (err, pet) => {
        if (err) console.log(err);
        if (!pet) {
            return message.reply("You don't have a pet!")
        } else {
            Coins.findOne({
                userID: message.author.id,
                serverID: message.guild.id
            }, (err, res) => {
                if (err) console.log(err);

                if (!res) return message.reply("Sorry, you have no coins.")
                let cost = pet.petRerolls * 100;
                if (cost > res.coins) return message.reply("Sorry, you need " + cost + " coins for a pet name reroll.").then(r => r.delete(5000));
                let newname = randomName({
                    first: true
                })
                res.coins = res.coins - cost;
                pet.petName = newname;
                pet.petRerolls++;
                pet.save().catch(err => console.log(err));
                res.save().catch(err => console.log(err));
                const embed = new Discord.RichEmbed()
                    .setTitle("Pet name rerolled!")
                    .setColor("BLURPLE")
                    .setDescription("New name is: " + newname + ". Cost for reroll: " + cost)
                message.channel.send(embed)
            })
        }
    })
}

module.exports.help = {
    //name this whatever the command name is.
    name: 'rerollpet'
}
