const Discord = require('discord.js')
const Pet = require("../models/pets.js")
const petUtil = require("../utils/pets.js")
module.exports.run = async (bot, message, args) => {
    //this is where the actual code for the command goes
    if (message.channel.type !== 'dm') return message.reply("Please DM me! :D");
    Pet.findOne({
        ownerID: message.author.id
    }, (err, pet) => {
        if (err) console.log(err);
        if (!pet) {
            message.reply("Sorry, but you don't have a pet... Do !getpet").then(m => m.delete(5000));
        } else {
            //Gonna handle this w a util for the training part. maybe generate a wild pet? random stats based 
            //on your pet? same stats different trait? 
            let data = petUtil.petTrain(pet);
            pet.petXp = pet.petXp + data.experience;
            petUtil.checkLevelUp(pet);
            
            return message.reply("You hit " + data.damage + " and gained " + data.experience + " experience.")
        }
    });
}
//name this whatever the command name is.
module.exports.help = {
    name: 'trainpet'
}