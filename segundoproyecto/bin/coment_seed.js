const mongoose = require('mongoose');
const {
    dbUrl
} = require('../config');
const Coment = require('../models/Coment');
const User = require('../models/User');
const Event = require('../models/Event');
mongoose.connect(dbUrl).then(() => console.log('db running'));

function getRandomUser() {
    User.find().exec((err, result) => {
        let randomIndex = Math.floor(Math.random() * (result.length + 1));
        let coment = new Coment({
            description : "ola k ase",
            creatorId : "5a817d22ac05e6c9285b5d99",
            username: "Manu",
            event_id : "5a81c11d59ab36dc077d6e1b",
            event_name : "Partido de fútbol",
        })
        //recorre el array de users y crea objetos
        coment.save((err) => {
            if (err) {
                throw err;
            }
            console.log(`coment added by ${coment.username}`)
            //cierra la conexion
            mongoose.connection.close();
        });
    });
};
getRandomUser();