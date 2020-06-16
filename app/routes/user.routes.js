module.exports = app => {
    const user = require("../controllers/user.controller");

    var router = require("express").Router();

    // cria um novo usuario
    router.post("/", user.create);

    // faz o login do usuario
    router.post("/login", user.login);

    // faz logout do usuario
    router.get("/logout", user.logout);

    //checa se o usuario esta autenticado
    router.get("/isLoggedIn", user.isLoggedIn2);

    //teste
    //router.get("/teste", user.teste);

    app.use('/api/user', router);
};