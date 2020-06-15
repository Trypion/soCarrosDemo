const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.carros = require('./car.model')(mongoose);
db.users = require('./user.model')(mongoose);
db.comments = require('./comment.model')(mongoose);

module.exports = db;