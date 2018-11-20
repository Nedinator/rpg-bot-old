const mongoose = require('mongoose');
const petSchema = mongoose.Schema({
    petName: String,
    petTrait: {type: String, default: 'None'},
    ownerID: String,
    ownerUsername: String,
    petLvl: {type: Number, default: 1},
    petXp: {type: Number, default: 0},
    petStats: {type: [], default: [{attack: 1, strength: 1, defence: 1, agility: 1}]},
    petTier: {type: Number, default: 1}
});
module.exports = mongoose.model('Pets', petSchema)