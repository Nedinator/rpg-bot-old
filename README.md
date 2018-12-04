# Welcome

Welcome to `NedRPG`. This is a open-source bot written in Discord.JS utilizing MongoDB using the npm package `mongoose`. 

## Discord Server

To join the support and test server [click here](https://discord.gg/wJVNCZJ)

## Plans

* [x] Economy system
  * [x] Give coins at random
  * [x] Pay command
  * [x] Coins Command
  * [x] Coins leaderboard
* [ ] The basics  
    * [ ] Cooldown
    * [ ] Alias
    * [x] Help command (*use module.exports.help or manually add?*)
        * [ ] Made it manually for now, will update to automatic later    
* [ ] Battle
  * [x] Base mechanics added
  * [ ] User data collection comes in here? what do i need in
    * [ ] Win Loss ratio
    * [ ] Level/XP
  * [ ] Classes?
    * [ ] Names? (Warrior, Mage, Archer, etc?)  *these all suck so please suggest some class names*
  * [ ] Profile
  * [ ] Level
  * [x] Record handling
  * [ ] Record Command (W/L, %, lvl, etc)
    * [ ] Is this going to be on the main profile or a different collection?
  * [x] Challenging opponents by using awaitMessages
* [ ] Buy command
    * [ ] Shop items (*possibly as a collection in the db?*) here: 
* [ ] Weapon System?
    * [ ] Start out as 4 types and different levels? (like [rs](https://runescape.com)?)
* [ ] Profile
  * [ ] Level
  * [ ] Stats
  * [ ] Record (W/L)
* [ ] Pet System
    * [x] Buying pet
        * [x] Confirmation for 1000 coins. 
    * [x] Train
        * [x] To train you would go to DMs with bot and you'd fight dummy. 
        * [x] Hit damage based on strength only and experience based on hit.
    * [ ] Pet Battle    
        * [ ] Outcome based on all 4 skills
        * [ ] Battle log. (Save to mongo?)
    * [ ] Command to reroll. First free, cost after that? 
        * [x] price for reroll formula : rerollcount * 100? (make it simple.)
        * [ ] Reset stats on reroll
        * [ ] Confirmation with awaitMessages()