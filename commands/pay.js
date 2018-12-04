const Discord = require('discord.js')
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/nedrpg', {
  useNewUrlParser: true
});
const Coins = require("../models/coins.js");


module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  await message.delete()
  //if(message.author.id !== "178657593030475776") return;
  //lets make sure a member is mentioned

  let target = message.mentions.members.first();
  if (!target || target.id === message.author.id) return message.reply("Example: !pay @member 100");
  let amt = parseInt(args[1]);
  if (isNaN(amt) || amt < 1) return message.reply("Nice try, guy.").then(r => r.delete(10000));

  let embed = new Discord.RichEmbed()
    .setTitle("Pay")
    .setThumbnail(message.author.displayAvatarURL);

  Coins.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, sendres) => {
    if (err) console.log(err);

    if (!sendres) {
      embed.setColor("RED");
      embed.addField("Error", "Sorry, you don't have any coins in this server...");
      return message.channel.send(embed);
    } else {
      if (amt > sendres.coins) return message.reply("Sorry, thats more coins than what you have!").then(r => r.delete(10000));
      Coins.findOne({
        userID: target.id,
        serverID: message.guild.id
      }, (err, targetres) => {
        if (err) console.log(err);

        //remove coins from sender
        sendres.coins = sendres.coins - amt;
        sendres.save().catch(err => console.log(err));

        if (!targetres) {
          const newTargetRes = new Coins({
            userID: target.id,
            username: target.user.username,
            serverID: message.guild.id,
            coins: amt
          })
          newTargetRes.save().catch(err => console.log(err))
        } else {
          targetres.coins = targetres.coins + amt;
          targetres.save().catch(err => console.log(err))
        }
      })

      embed.setColor("BLURPLE")
      embed.addField("Coins sent!", amt + " coins have been sent to " + target.user.username + ".")
      message.channel.send(embed);
    }


  })

}
//name this whatever the command name is.
module.exports.help = {
  name: "pay"
}