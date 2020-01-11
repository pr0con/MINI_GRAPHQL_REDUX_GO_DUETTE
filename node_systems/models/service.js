const service = (sequelize, DataTypes) => {
	const Service = sequelize.define('service', {
		name: { type: DataTypes.STRING },
		port: { type: DataTypes.INTEGER.UNSIGNED },
	});
	
	Service.associate = models => {
		Service.belongsTo(models.System)
	}
	
	return Service;
}

module.exports = service;