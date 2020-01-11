import React, { useState } from "react";
import styled from 'styled-components';
import gql  from 'graphql-tag';
import { Mutation } from 'react-apollo';

const StyledGQLInstallUserForm = styled.div`
	
`;

//crsq = create system query

const iu = gql`
	mutation installUser($name: String!, $username: String!, $password: String!, $profileImage: String! ) {
		installUser(name: $name, username: $username, password: $password, profileImage: $profileImage)
	}
` 

export function GQLInstallUserForm({rq}) {
	const [ formValues, setFormValues ] = useState({ name: '', username: '', password: '' });
	
	const handleChange = (field, value) => {
		setFormValues({ ...formValues, [field]:value});
	}
	
	
	const handleSubmit = (e,f) => {
		e.preventDefault();	
		f({
			variables: {
				name: formValues.name,
				username: formValues.username,
				password: formValues.password,
				profileImage: "no-profile-image-set"
			}
		});
		console.log(formValues);
	}
	
	return(
		<StyledGQLInstallUserForm>
			<Mutation mutation={iu} >
			{(installUser, {loading, error} ) => (
				<>
					<form onSubmit={(e) => handleSubmit(e, installUser)}>
						<input type="text" placeholder="name" onChange={(e) => handleChange('name', e.target.value)}/>
						<input type="text" placeholder="usernamename" onChange={(e) => handleChange('username', e.target.value)}/>
						<input type="password" placeholder="password" onChange={(e) => handleChange('password', e.target.value)}/>
						<input type="submit" value="Install User" />
					</form>
					
					{ loading && <p>Creating User....</p> }
					{ error && <p>Error Creating User....</p> }
				</>
			)}
			</Mutation>
		</StyledGQLInstallUserForm>
	)
}