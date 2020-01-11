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
	}	
	
	extend type Mutation {
		createService(name: String!, port: Int!): Service!
		removeService(id: Int!): Boolean
	}	
`;