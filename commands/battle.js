const Discord = require('discord.js')
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/nedrpg', {
  useNewUrlParser: true
});
const Coins = require("../models/coins.js");
module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  await message.delete();
  let target = message.mentions.members.first();
  if (!target) return message.reply("Please mention a member to battle!").then(r => r.delete(10000));
  let price = parseInt(args[1]);
  if (!price || isNaN(price) || price < 1) return message.reply("Please try that again... ").then(r => r.delete(10000));
  let embed = new Discord.RichEmbed()
    .setTitle("Battle!")
    .setColor("BLURPLE")
    .setDescription(price + " coins at stake");
  Coins.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, res) => {
    if (err) console.log(err);
    if (!res || res.coins < price) return message.reply("Sorry but you dont have enough coins for that").then(r => r.delete(10000));
    Coins.findOne({
      userID: target.id,
      serverID: message.guild.id
    }, (err, targetres) => {
      if (err) console.log(err)
      if (!targetres || targetres.coins < price) return message.reply("Sorry but the target doesn't have enough coins for that").then(r => r.delete(10000));
      const filter = m => m.author.id === target.id;
      message.channel.send(target + " you have been challenged by " + message.author + " for " + price + " coins. To accept type 'accept'. You have 20 seconds").then(r => r.delete(20000));
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000
      }).then(collected => {
        if (collected.first().content === 'cancel') return message.channel.send(target + ", Canceled... " + message.author).then(r => r.delete(10000));
        if (collected.first().content.toLowerCase() === 'accept') {
          let chance = Math.floor(Math.random() * 100) + 1;
          if (chance < 50) {
            //sender wins
            targetres.coins = targetres.coins - price;
            res.coins = res.coins + price;
            embed.addField("Winner", message.author);
            embed.addField("Loser", target);
          } else {
            //target wins
            targetres.coins = targetres.coins + price;
            res.coins = res.coins - price;
            embed.addField("Winner", target);
            embed.addField("Loser", message.author);
          }
          //end
          targetres.save().catch(err => console.log(err));
          res.save().catch(err => console.log(err));
          message.channel.send(embed);
        }
      }).catch(err => {
        message.reply(" - " + target + " Time limit exceeded").then(r => r.delete(5000));
      });
    });
  });
}
//name this whatever the command name is.
module.exports.help = {
  name: "battle"
}