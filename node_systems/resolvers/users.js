const jwt = require('jsonwebtoken');

const generateJwt = (user, secret, expiresIn) => {
	const { id, name, username } = user;
	return jwt.sign({ id,name,username }, secret, {expiresIn})
}

const resolvers = {
	Query: {
		users: ( parent,args, {data}) => {
			return data.User.findAll()
		},
		user: (parent, args, {data}) =>  {
			return data.User.findByPk(args.id)
		},				
	},
	Mutation: {
		createUser: (parent, {name, username}, {data}) => {
			const user = {
				name,
				username
			}
			return data.User.create(user)
		},
		removeUser: (parent, {id}, {data}) => {
			return data.User.destroy({
				where: { id }
			})
		},
		installUser: async (parent, {name,username,password,profileImage}, {data, who}) => {
			if(who === "Notta") {
				throw new Error("Please Authenticate...");
			}
						
			const user = {
				name,
				username,
				password,
				profileImage
			};
			try {
				const installedUser = await data.User.create(user);
				if(installedUser !== 'undefined') {
					switch(typeof installedUser.id){
							case 'number':
								return true;
							default:
								return false;						
					}
				} else { return true; }
			}	
			catch(e) {
				console.log(e);
				return e;
			}
		},
		login: async(parent, {username,password}, {data, secret }) => {
			const user = await data.User.findOne({ where: {username} });
			if(!user) { throw new Error('User not found.')}
			
			const verified = await user.verifyPassword(password);
			
			if(!verified) { throw new Error("Invalid Credentials."); }
			
			return {
				jwt: generateJwt(user, secret, '30m')
			}			
		},
		setProfileImage: async (parent, { id, filename }, {data, who}) => {
			if(who === "Notta") {
				throw new Error("Please Authenticate...");
			}
			try {
				await data.User.update({
					profileImage: filename
				}, {
					where: { id: id }
				});
				return filename;
			} catch(error) {
				throw new Error(error);
			}		
		}		
	},
		
}

module.exports = resolvers;