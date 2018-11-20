const Discord = require('discord.js')
const Pet = require("../models/pets.js")
module.exports.run = async (bot, message, args) => {
    //this is where the actual code for the command goes
    Pet.findOne({
        ownerID: message.author.id
    }, (err, res) => {
        let embed = new Discord.RichEmbed()
        .setTitle("My Pet!")
        .setThumbnail(message.author.displayAvatarURL)

        if(!res){
            embed.setColor("RED")
            embed.addField("Sorry!", "You don't have a pet... Please type !getpet.")
        }else{
            embed.setColor("BLURPLE");
            embed.addField("Pet Name", res.petName);
            embed.addField("Pet Level", "Level: " + res.petLvl + ".");
            embed.addField("Pet XP", "XP: " + res.petXp);
        }
        message.channel.send(embed);
    })
}
//name this whatever the command name is.
module.exports.help = {
    name: 'mypet'
}