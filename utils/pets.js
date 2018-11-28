const randomName = require("node-random-name");
const pet = require("../models/pets.js")

module.exports.petTrain = (pet) => {
    console.log(pet.petStats[0]);
    let ai = {
        name: '',
        stats: []
    }
    let ainame = randomName({
        first: true
    })
}
