const db = require('./app/models');
const Carro = db.carros;
const User = db.users;

let data = [{
    modelo: "Dodge",
    ano: 1974,
    preco: 46000,
    cor: "Laranja",
    descricao: "um verdadeiro muscle americado",
    imagem: "https://i.imgur.com/rXHjIKn.jpg",
    author: {
        id: "5eebcf564373a1086897d9c2",
        username: "Israel"
    }
}, {
    modelo: "Jeep",
    ano: 2000,
    preco: 21000,
    cor: "azul marinho",
    descricao: "um jeep como você sempre desejou",
    imagem: "https://i.imgur.com/bWB52UR.jpg",
    author: {
        id: "5eebcf564373a1086897d9c2",
        username: "Israel"
    }
}, {
    modelo: "Ferrari",
    ano: 2010,
    preco: 550000,
    cor: "vermelha",
    descricao: "Uma linda ferrari vermelha como deus quis",
    imagem: "https://i.imgur.com/M4I8TX3.jpg",
    author: {
        id: "5eebcf564373a1234897d9c2",
        username: "Santa"
    },
}, {
    modelo: "Fusca",
    ano: 1994,
    preco: 25000,
    cor: "cinza",
    descricao: "um fusca das antiga igual ao que o vovô tinha",
    imagem: "https://i.imgur.com/UVyX4mQ.jpg",
    author: {
        id: "5eebcf564373a1086897d9c2",
        username: "Israel"
    },
}, {
    modelo: "McLaren F1",
    ano: 2018,
    preco: 600000,
    cor: "Laranja",
    descricao: "o super esportivo dos sonhos",
    imagem: "https://i.imgur.com/JEjX5sQ.jpg",
    author: {
        id: "5eebcf564373a1234897d9c2",
        username: "Santa"
    },
}, {
    modelo: "Ferrari 458 Spider",
    ano: 2019,
    preco: 750000,
    cor: "Preto",
    descricao: "um lindo super esportivo",
    imagem: "https://i.imgur.com/yCiU6i2.jpg",
    author: {
        id: "5eebcf564373a1086897d9c2",
        username: "Israel"
    },
}, {
    modelo: "Kombi",
    ano: 1993,
    preco: 35000,
    cor: "Laranja",
    descricao: "linda e conservada",
    imagem: "https://i.imgur.com/5HQOP07.jpeg",
    author: {
        id: "5eebcf564373a1086897d9c2",
        username: "Israel"
    },
}, {
    modelo: "Firebird",
    ano: 1976,
    preco: 54000,
    cor: "Laranja",
    descricao: "firebird restaurado com 500cv",
    imagem: "https://i.imgur.com/54H44cz.jpeg",
    author: {
        id: "5eebcf564373a1086897d9c2",
        username: "Israel"
    }
}]




async function seedDB() {
    //remove todos os carros da database
    await Carro.deleteMany({}, (err) => {
        if (err) console.log(err);
        console.log("carros removidos");
    })

    //adiciona os carros da lista
    await data.forEach((seed) => {
        Carro.create(seed, (err) => {
            if (err) console.log(err);
            console.log('carro adicionado');
        })
    });

    await User.deleteMany({}, (err) => {
        if (err) console.log(err);
        console.log("usuários removidos");
    })

    await User.create(() => {
        user = {
            _id: "5eebcf564373a1086897d9c2",
            username: "Israel"
        }

        User.register(user, '123', (err, user) => {
            if (err) console.log('erro ao registrar user')
            console.log('usuario criado login: Israel, senha: 123');
        })
    })
}

module.exports = seedDB;