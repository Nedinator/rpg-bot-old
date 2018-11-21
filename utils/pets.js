const randomName = require("node-random-name");
const Pet = require("../models/pets.js")
module.exports.petTrain = (pet) => {
    //getting here lol 
    console.log(pet.petStats[0]);
    let ai = {
        name: '',
        stats: []
    }
    let ainame = randomName({first: true})
    
}
