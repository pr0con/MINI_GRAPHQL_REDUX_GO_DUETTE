const { gql } = require('apollo-server-express');
module.exports = gql`
	extend type Query {
		services: [Service]
		service (id: ID!): Service				
	}

	type Service {
		id: ID!
		name: String!
		port: Int!
		system: System!
	}	
	
	extend type Mutation {
		createService(id: Int! , name: String!, port: Int!): Service!
		removeService(id: Int!): Boolean
	}	
`;