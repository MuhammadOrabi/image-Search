// Create new SQL LITE DB

var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;
if (env === 'development') {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/dev-api.sqlite'
	});
} else {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
}

var db = {};
db.img = sequelize.import(__dirname + '/models/img.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;