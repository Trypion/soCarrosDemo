const db = require('../models');
const Carro = db.carros;

// Cria e salva um novo carro
exports.create = (req, res) => {
    // valida o request
    if (!req.body.modelo) {
        res.status(400).send({
            message: "Conteudo não pode ser vazio"
        });
        return;
    }

    //cria um carro
    const carro = new Carro({
        modelo: req.body.modelo,
        ano: req.body.ano,
        preco: req.body.preco,
        cor: req.body.cor,
        descricao: req.body.descricao,
        imagem: req.body.imagem,
        vendido: req.body.vendido ? req.body.vendido : false,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    })

    //salva o carro no banco
    carro.save(carro).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Algum erro ao criar o carro"
        });
    });

};

// busca todos os carros do banco
exports.findAll = (req, res) => {
    const modelo = req.query.modelo;
    var condition = modelo ? {
        modelo: {
            $regex: new RegExp(modelo),
            $options: "i"
        }
    } : {};

    Carro.find(condition).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "algum erro ao encontrar todos os carros."
        });
    });
};

// encontra um unico carro pelo id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Carro.findById(id).then((data) => {
        if (!data)
            res.status(404).send({
                message: "nenhum carro encontrado com este id: " + id
            });
        else res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "erro ao tentar encontrar um carro com o id: " + id
        });
    });
};

// atualiza um carro pelo id
exports.update = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0 || !req.body) {
        return res.status(400).send({
            message: "Conteudo para update não pode ser vazio"
        });
    }

    const id = req.params.id;

    Carro.findByIdAndUpdate(id, req.body).then((data) => {            
            if (!data) {
                res.status(404).send({
                    message: `Não foi possivel atualizar os dados do carro com o id=${id}. talvez o carro não foi encontrado`
                })
            }
            else res.send({
                message: "informações atualizadas com sucesso"
            });
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "erro ao atualizar o carro com id: " + id
            });
        });
};

// deleta um carro pelo id
exports.delete = (req, res) => {

    const id = req.params.id;

    Carro.findByIdAndRemove(id).then((data) => {
        if(!data) {
            res.status(404).send({
                message: `Não foi possivel deletar o carro com o id=${id}. Talvez o carro não foi encontrado`
            })
        } else {
            res.send({
                message: "Carro deletado com sucesso!"
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Não foi possivel deletar o carro com o id: " + id
        });
    });
};

// apaga todos os carros do banco
exports.deleteAll = (req, res) => {

    Carro.deleteMany({}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Algum erro orccoreu ao tentar deletar os carros"
        })
    });

};

// encontra todos os carros vendidos
exports.encontraVendidos = (req, res) => {

    Carro.find({vendido: true}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Algum erro occorreu ao tentar conseguir os dados"
        })
    });
};