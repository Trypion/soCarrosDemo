const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();

const db = require('./app/models');
const User = db.users;

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true,

}

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

require("./app/routes/carro.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});