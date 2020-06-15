const db = require('../models');
const User = db.users;
const passport = require('passport');

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
        res.send({
            success: true
        });
    });
}

//logout logic
exports.logout = (req, res) => {    
    req.logout();
    res.send(true);
};


//testes
exports.teste = (req,res) => {
    console.log("autenticado");    
};

exports.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        console.log(req.session);
        res.send({success: true})
        next();
    } else{
        console.log(req.session);
        console.log('false');
        res.send({success: false});
    }
}

//checa se o usuario esta logado
exports.isLoggedIn = (req, res) => {
    if (req.isAuthenticated()) {
        res.send(true);
    } else {
        res.send(false);
    }
}