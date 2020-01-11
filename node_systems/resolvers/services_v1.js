const resolvers = {
	Query: {
		services: ( parent, args, {data} ) => data.services,
		service: (parent, args, {data}) =>  {
			const service = data.services.filter(service => service.id == args.id );
			return service[0]
		}				
	},
	Service: {
		system: (parent, args, {data}) => data.systems[parent.system]
	},
	
	//could use args here but instead we destructure them out....
	Mutation: {
		createService: (parent, {id,name,port}, {data}) => {
			const service  = {
				id,
				name,
				port
			}
			data.services.push(service)
			return service
		},
		removeService: (parent, {id}, {data}) => {
			let res = false;
			data.services = data.services.filter(service => {
				if(service.id === id) { res = true; } else { return service; }
			});
			return res;
		}
	}
};

module.exports = resolvers;
