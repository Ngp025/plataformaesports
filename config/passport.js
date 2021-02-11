/*      SILENCIADO MOMENTANEAMENTE HASTA QUE REGRESE PASSPORT
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

//Load User Model
const User = require("../src/models/users/users")

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email"}, (email, password, done) => {
            //Match User
            User.findOne({email: email})
            .then(user => {
                if(!user){
                    return done(null, false, {alert: "Disculpe el email no esta registrado"});
                }

                //Match password 
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;

                    if(isMatch) {
                        //paso
                        return done(null, user)
                    } else {
                        //contrase;a incorrecta
                        return done(null, false, {alert: "Disculpe el password incorrecto"} )
                    }
                })
            })
            .catch(err => console.log(err))
        })
    );
}
*/