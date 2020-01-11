const { gql } = require('apollo-server-express');
module.exports = gql`
	extend type Query {
		systems: [System]
		system (id: ID!): System			
	}
	
	type System {
		id: ID!
		name: String!
		services: [Service]
	}	
	
	extend type Mutation {
		createSystem(id: Int! , name: String!): System!
		removeSystem(id: Int!): Boolean
	}	
`;