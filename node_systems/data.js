let users = [
	{
		id: 0,
		name: 'system admin'	
	},
	{
		id: 1,
		name: 'site owner'
	},
				
]

let systems = [
	{
		id: 0,
		name: 'system_zero',
		services: [0,1,2]
	},
	{
		id: 1,
		name: 'system_one',
		services: [0,2]
	},
	{
		id: 2,
		name: 'system_two',
		services: []
	},
	{
		id: 3,
		name: 'system_three',
		services: [0,1,2]
	},				
]

let services = [
	{
		id: 0,
		name: 'redis',
		port: 6379,
		system: 0,
	},
	{
		id: 1,
		name: 'mongo',
		port: 27017,
		system: 1,
	},
	{
		id: 2,
		name: 'mysql',
		port: 3306,
		system: 2,
	},		
]

module.exports = {
	users,
	systems,
	services,
};