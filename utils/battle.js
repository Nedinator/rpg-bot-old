const mongoose = require("mongoose")
const Profile = require("../models/profile.js");

mongoose.connect('mongodb://localhost/nedrpg', {
    useNewUrlParser: true
});

module.exports.recordSave = (message, winner, loser) => {
    Profile.findOne({
        userID: winner.id,
        serverID: message.guild.id
    }, (err, res) => {
        if (err) console.log(err);
        if (!res) {
            const newDoc = new Profile({
                userID: winner.id,
                username: winner.user.username,
                serverID: message.guild.id,
                wins: 1,
                losses: 0
            })
            newDoc.save().catch(err => console.log(err));
        } else {
            res.wins = res.wins + 1;
            res.save().catch(err => console.log(err));
        }
        Profile.findOne({
            userID: loser.id,
            serverID: message.guild.id
        }, (err, res) => {
            if (err) console.log(err)
            if (!res) {
                const newDoc = new Profile({
                    userID: loser.id,
                    username: loser.user.username,
                    serverID: message.guild.id,
                    wins: 0,
                    losses: 1
                })
                newDoc.save().catch(err => console.log(err));
            } else {
                res.losses = res.losses + 1;
                res.save().catch(err => console.log(err));
            }
        })
    });
}
