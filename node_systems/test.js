const { sequelize } = require('./models/db.js');
const models = require('./models/index.js');

const makeData = async() => {
	/*
	await models.System.create({
		name: 'system one',
		services: [
			{
				name: 'mongo',
				port: 27017
			},
			{
				name: 'mysql',
				port: 3306
			}	
		]
	}, {
		include: models.Service
	})
	*/
	/*
	await models.User.create({
		name: 'test',
		username: 'something',
		password: 'something'
	})		
	*/
}

//sequelize.sync({ force: true }) <-- force recreate tables...
sequelize.sync().then(async() => {
	try { 
		await makeData(); 
	} catch(err) {
		console.log(err);
	}
})