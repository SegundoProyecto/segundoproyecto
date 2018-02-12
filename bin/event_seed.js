const mongoose = require('mongoose');
const {
    dbUrl
} = require('../config');
const Coment = require('../models/Coment');
const User = require('../models/User');
const Event = require('../models/Event');

mongoose.connect(dbUrl).then(() => console.log('db running'));

function getRandomUser() {
    Event.find().exec((err, result) => {
        let randomIndex = Math.floor(Math.random() * (result.length + 1));
        let event = new Event({
            title: "Partido de fútbol",
            description: "Partido de fútbol 7, nivel medio",
            category : "Fútbol sala",
            creatorId : "5a817d22ac05e6c9285b5d99",
            username: "Pepe",
            goal: 5,
            backerCount: 13,
            totalCount: 0,
        })
        //recorre el array de users y crea objetos
        event.save((err) => {
            if (err) {
                throw err;
            }
            console.log(`event added by ${event.username}`)
            //cierra la conexion
            mongoose.connection.close();
        });
    });
};
getRandomUser();