const Sequelize = require('sequelize');
const sequelize = new Sequelize('graphql', 'root', 'SOMEHARDPASSWORD', {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
	operatorsAliases: 0,
	define: {
		timestamps: false
	}
});

module.exports = {
	sequelize
}