const bcrypt = require('bcrypt');

const user = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		name:  { type: DataTypes.STRING },
		username: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				notEmpty: true
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				notEmpty: true,
				len: [ 4,16 ]
			}
		},
		profileImage: { type: DataTypes.STRING }		
	});
	
	User.prototype.hashPassword = async function() {
		return bcrypt.hash(this.password, 10)
	}
	
	User.beforeCreate(async user => {
		user.password = await user.hashPassword(user.password)
	});
	
	
	User.prototype.verifyPassword = async function(password) {
		return await bcrypt.compare(password, this.password);
	}	
	
	return User;
}

module.exports = user;