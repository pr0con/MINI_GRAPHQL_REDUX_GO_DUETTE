const { gql } = require('apollo-server-express');
module.exports = gql`
	extend type Query {
		users: [User]
		user (id: ID!): User		
	}
	
	type User {
		id: ID!
		name: String!
		username: String!
		profileImage: String!
	}
	
	type Jwt {
		jwt: String!
	}

	
	extend type Mutation {
		createUser(name: String!, username: String! ): System!
		removeUser(id: Int!): Boolean
		installUser(name: String!, username: String!, password: String!, profileImage: String! ): Boolean!
		login(username: String!, password: String!): Jwt!
		setProfileImage(id: Int!, filename: String!): String!
	}			
`;