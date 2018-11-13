//First thing we need... discord.js! 
const Discord = require("discord.js");

//here i get the config and token file required for later use
const config = require("./config.json");
const token = require("./token.json");
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/nedrpg', {
  useNewUrlParser: true
});
const Coins = require("./models/coins.js");

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
  console.log(bot.user.username + " is online.")
});

bot.on("message", async message => {
  //a little bit of data parsing/general checks
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;

  if (command.startsWith(prefix)) {

    let commandfile = bot.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
  } else {
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance > 50) {
      //here is where the coins are added.

      let coinstoadd = Math.ceil(Math.random() * 15) + 5;

      Coins.findOne({
        userID: message.author.id,
        serverID: message.guild.id
      }, (err, res) => {
        if(err) console.log(err);

        if(!res){
          const newDoc = new Coins({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            coins: coinstoadd
          })
          newDoc.save().catch(err => console.log(err));
        }else{
          res.coins = res.coins + coinstoadd;
          res.save().catch(err => console.log(err))
        }
      })
    }
  }
});

bot.login(token.token)