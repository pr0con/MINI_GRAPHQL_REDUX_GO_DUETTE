import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const StyledGQLAxios = styled.div`
button {
		width: 100px;
		height: 20px;
	}
`;

import Uploader from './Uploader.js';


export function GQLAxios({ GQLJwt }) {
	const [ users, setUsers ] = useState([]);
	
	const [ forUserId, setForUserId ] = useState(0);
	const [ profileImageUrl, setProfileImageUrl ] = useState(null);
		
	const getUsers = async() => {
		const query = `{
			users {
				id,
				name
			}
		}`
		
		const result = await axios.post(`https://delilah.pr0con.com:3000/graphql`, {
			query,
		}).then((result)  => {
			console.log(result);
			setUsers(result.data.data.users);
		}, (error) => {
			console.log(error);
		})		
	}
	
	useEffect(() => {
		getUsers();
	},[])
	
	const setProfileImage = async() => {
		const query = `
			mutation($id: Int!, $filename: String!) {
				setProfileImage(id: $id ,filename: $filename)
			}
		`;			
		
		
		const result = await axios.post(`https://delilah.pr0con.com:3000/graphql`,{
			query,
			variables: {
				id: +forUserId,
				filename: profileImageUrl
			}
		},{headers: {
		 	'gql-auth-token': GQLJwt,
		 	'Content-Type': 'application/json'
		}}).then((result)  => {
			console.log(result);
		}, (error) => {
			console.log(error);
		})
				
	}
	
	useEffect(() => {
		if(profileImageUrl !== null) {
			setProfileImage()
		}			
	},[ profileImageUrl ]);
	
	return(
		<StyledGQLAxios>
			<ul>
				{ users.length > 0 && users.map((u) => (
					
					<li>
						{ u.name }
						<Uploader uid={u.id} setForUserId={setForUserId} setProfileImageUrl={setProfileImageUrl}/>			
					</li>
				))}
			</ul>
			
			{profileImageUrl !== null &&
				<img src={profileImageUrl} />
			}
		</StyledGQLAxios>
	)				
}