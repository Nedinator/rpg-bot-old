const Discord = require('discord.js')
const pkg = require("../package.json");
const conf = require("../config.json");
module.exports.run = async (bot, message, args) => {
  //this is where the actual code for the command goes
  await message.delete(50);

    let embed = new Discord.RichEmbed()
    .setTitle("Help Menu")
    .setColor("BLURPLE") //who doesn't love a good blurple
    .setThumbnail(bot.user.displayAvatarURL)
    .setDescription("Current version: v" + pkg.version + ". Prefix: "+ conf.prefix)
    .addField("Current active", "battle, coins, help, pay, wealthy")
    .addField("Coming Soon", "profile, shop, level, class");
  
  
  message.channel.send(embed)
}
//name this whatever the command name is.
module.exports.help = {
  name: 'help'
}