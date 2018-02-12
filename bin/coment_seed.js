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
            coment : "ola k ase",
            user_id: result[randomIndex]._id,
            user_name : result[randomIndex].username,
            event_id : result[randomIndex]._id,
            event_name : result[randomIndex].name
        })
        //recorre el array de users y crea objetos
        coment.save((err) => {
            if (err) {
                throw err;
            }
            console.log(`coment added by ${coment.user_name}`)
            //cierra la conexion
            mongoose.connection.close();
        });
    });
};
getRandomUser();