const resolvers = {
	Query: {
		systems: ( parent,args, {data}) => data.systems,
		system: (parent, args, {data}) =>  {
			console.log(args);
			const system = data.systems.filter(system => system.id == args.id );
			return system[0]
		},				
	},
	System: {
		services: (parent, args, {data}) => {
			return parent.services.map(sid => data.services[sid])
		}
	},	
	
	//could use args here but instead we destructure them out....
	Mutation: {
		createSystem: (parent, {id,name}, {data}) => {
			const system = {
				id,
				name
			}
			data.systems.push(system)
			return system
		},
		removeSystem: (parent, {id}, {data}) => {
			let res = false;
			data.systems = data.systems.filter(system => {
				if(system.id === id) { res = true; } else { return system; }
			});
			return res;
		}
	}
};

module.exports = resolvers;
