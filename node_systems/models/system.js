const system = (sequelize, DataTypes) => {
	const System = sequelize.define('system', {
		name:  { type: DataTypes.STRING }
	});
	
	
	System.associate = models =>  {
		System.hasMany(models.Service, { onDelete: 'CASCADE' })
	}
	
	return System;
}

module.exports = system;