const Discord = require('discord.js')
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/nedrpg', {
  useNewUrlParser: true
});
const Coins = require("../models/coins.js");


module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  await message.delete()

  let embed = new Discord.RichEmbed()
    .setTitle("Coins Leaderboard")
    .setThumbnail(bot.user.displayAvatarURL);

  Coins.find({
    serverID: message.guild.id
  }, (err, res) => {
    if(err) console.log(err);

    if(!res){
      embed.setColor("RED");
      embed.addField("Error", "Sorry, there aren't any coins in this server");
    }else if(res.length < 10){
      embed.setColor("BLURPLE");
      for (i = 0; i < res.length; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].coins}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].coins}`);
        }
      }
    }else{
      embed.setColor("BLURPLE");
      for (i = 0; i < 10; i++) {
        let member = message.guild.members.get(res[i].userID) || "User Left"
        if (member === "User Left") {
          embed.addField(`${i + 1}. ${member}`, `**Coins**: ${res[i].coins}`);
        } else {
          embed.addField(`${i + 1}. ${member.user.username}`, `**Coins**: ${res[i].coins}`);
        }
      }
    }

    message.channel.send(embed)

  })

}
//name this whatever the command name is.
module.exports.help = {
  name: "wealthy"
}