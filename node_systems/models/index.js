const { sequelize } = require('./db.js');

const systemModel = sequelize.import('./system.js');
const serviceModel = sequelize.import('./service.js');

const userModel = sequelize.import('./user.js');

const models = {
	System: systemModel,
	Service: serviceModel,
	User: userModel,
}

Object.keys(models).forEach(key => {
	if('associate' in models[key]) {
		models[key].associate(models);	
	}
})

module.exports = models;