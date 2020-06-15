module.exports = app => {
    const carros = require("../controllers/carro.controller");

    var router = require("express").Router();

    // cria um novo carro
    router.post("/", carros.create);

    // Retorna todos os carros
    router.get("/", carros.findAll);

    // retorna todos os carros vendidos
    router.get("/vendidos", carros.encontraVendidos);

    // retorna um unico carro pelo id
    router.get("/:id", carros.findOne);

    // atualiza um carro pelo id
    router.put("/:id", carros.update);

    // deleta um carro pelo id
    router.delete("/:id", carros.delete);

    // deleta todos os carros
    router.delete("/", carros.deleteAll);

    app.use('/api/carros', router);
};