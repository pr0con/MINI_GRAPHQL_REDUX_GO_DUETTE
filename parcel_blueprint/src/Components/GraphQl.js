import React from "react";
import styled from 'styled-components';
import gql  from 'graphql-tag';
import ApolloClient  from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const StyledGraphQl = styled.div`
	
`;




import { Systems } from './Systems.js';
import { GQLAddSystemForm } from './GQLAddSystemForm.js';
import { GQLLoginForm } from './GQLLoginForm.js';
import { GQLInstallUserForm } from './GQLInstallUserForm.js';
import { GQLAxios } from './GQLAxios.js';


export function GraphQl({ GQLJwt, setGQLJwt }) {
	const q = gql`
		query {
			users{
				id
				name,
				profileImage
			}
			systems {
				name,
				services {
					name,
					port
				}
			}
		}	
	`;
	
	const AC = new ApolloClient({
		uri: 'https://delilah.pr0con.com:3000/graphql',
		request: async operation =>{
			if(GQLJwt != "") {
				operation.setContext({
					headers: {
						'gql-auth-token': GQLJwt
					}
				})
			}
		}		
	});


	
	return (
		<StyledGraphQl>
			<ApolloProvider client={AC}>
				<Systems q={q} GQLJwt={GQLJwt}/>
				<GQLAddSystemForm rq={q} GQLJwt={GQLJwt}/>
				<GQLLoginForm setGQLJwt={setGQLJwt}/>
				<GQLInstallUserForm />
				<GQLAxios GQLJwt={GQLJwt} />
			</ApolloProvider>
		</StyledGraphQl>
	)
}
