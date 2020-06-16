const db = require('../models');
const User = db.users;
const passport = require('passport');
const Carro = db.carros;

// cria novo usuario
exports.create = (req, res) => {
    const newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err.message || "algum erro ao criar o usuario"
            });
        } else {
            passport.authenticate("local")(req, res, () => {
                res.send({
                    success: true
                });
            });
        }
    });
};

//login logic
exports.login = (req, res) => {
    passport.authenticate("local")(req, res, () => {
        res.status(200).send();
    });
}

//logout logic
exports.logout = (req, res) => {
    req.logout();
    res.send(true);
};

//testes
exports.teste = (req, res) => {
    let author;
    if (req.user) {
        author = {
            id: req.user._id,
            username: req.user.username
        }
    }
    console.log(author);
    res.status(200).send();
};

//middleware que checa pra ver se o carro pertence ao usuario
exports.checkCarOwnership = (req, res, next) => {    
    if (req.isAuthenticated()) {        
        Carro.findById(req.params.id, (err, foundCar) => {
            if (err) {
                res.status(404).send();
            } else {
                if (foundCar.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.status(401).send();
                }
            }
        })
    }else{ 
        res.status(401).send({
            message: "você precisa estar logado"
        });
    }
}

//checa se o usuario esta logado
exports.isLoggedIn2 = (req, res) => {
    if (req.isAuthenticated()) {
        res.send(true);
    } else {
        res.send(false);
    }
}

//checa se o usuario esta logado
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.status(401).send();
    }
}