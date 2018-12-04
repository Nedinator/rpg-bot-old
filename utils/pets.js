const randomName = require("node-random-name");
const Pet = require("../models/pets.js")
module.exports.petTrain = (pet) => {
    
    // Train on training dummy
    let hit = Math.ceil(Math.random() * 10) * pet.petStats.strength;
    let xp = Math.ceil(hit * 4);

    let data = {
        experience: xp,
        damage: hit
    }

    return data;

}

module.exports.checkLevelUp = (pet) => {
    
    let needXP = (pet.petLvl * 300) + (pet.petLvl * 100)
    if(pet.petXp >= needXP){
        pet.petLvl = pet.petLvl + 1;
    }
    return pet.save().catch(err => console.log(err));

}

module.exports.petFight = (senderpet, targetpet) => {
    //will add to this soon
}