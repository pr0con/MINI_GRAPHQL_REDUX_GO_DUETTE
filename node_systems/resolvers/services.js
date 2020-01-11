const resolvers = {
	Query: {
		services: ( parent, args, {data} ) => {
			return data.Service.findAll()
		},
		service: (parent, args, {data}) =>  {
			return data.Service.findByPk(args.id)
		}				
	},	
	//could use args here but instead we destructure them out....
	Mutation: {
		createService: (parent, {name,port}, {data}) => {
			const service  = {
				name,
				port
			}
			return data.System.create(service)
		},
		removeService: (parent, {id}, {data}) => {
			return data.Service.destroy({
				where: { id }
			})
		}
	}
};

module.exports = resolvers;