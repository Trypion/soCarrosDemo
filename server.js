const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');

const seedDB = require("./seeds");

const app = express();

const db = require('./app/models');
const User = db.users;

const corsOptions = {    
    credentials: true
}

app.use(express.static('spice-demo'));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

db.mongoose.connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Conectado ao banco");
    })
    .catch(err => {
        console.log("Falha ao conectar ao banco", err);
        process.exit();
    });

app.use(require('express-session')({
    secret: "o melhor segredo que eu pude pensar",
    resave: false,
    saveUninitialized: false    
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {    
    res.locals.currentUser = req.user;        
    next();
});

seedDB();

//rotas
require("./app/routes/carro.routes")(app);
require("./app/routes/user.routes")(app);
app.use((req, res, next) =>{
    res.sendFile(path.join(__dirname, "spice-demo", "index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server esta rodando na porta ${PORT}.`);
});