const resolvers = {
	Query: {
		systems: ( parent,args, {data}) => {
			return data.System.findAll()
		},
		system: (parent, args, {data}) =>  {
			return data.System.findByPk(args.id)
		},				
	},
	
	//could use args here but instead we destructure them out....
	Mutation: {
		createSystem: (parent, {name}, {data, who}) => {
			if(who === "Notta") {
				throw new Error("Please Authenticate...");
			} 	
		
			const system = {
				name,
			}
			return data.System.create(system)
		},
		removeSystem: (parent, {id}, {data}) => {
			return data.System.destroy({
				where: { id }
			})
		}
	},
	
	System: {
		services:(parent, args, {data}) => {
			return data.Service.findAll({
				where: {
					systemId: parent.id
				}
			})
		}
	}
};

module.exports = resolvers;