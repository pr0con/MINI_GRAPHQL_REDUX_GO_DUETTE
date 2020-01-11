import React, { useState } from "react";
import styled from 'styled-components';
import gql  from 'graphql-tag';
import { Mutation } from 'react-apollo';

const StyledGQLLoginForm = styled.div`
	
`;


const lgn = gql`
	mutation login($username: String!, $password: String! ) {
		login(username: $username, password: $password) {
			jwt
		}
	}
`;


export function GQLLoginForm({ setGQLJwt }) {
	const [ formValues, setFormValues ] = useState({ username: '', password: '' });
	
	const handleChange = (field, value) => {
		setFormValues({ ...formValues, [field]:value});
	}
	
	const handleSubmit = (e,f) => {
		e.preventDefault();	
		f({
			variables: {
				username: formValues.username,
				password: formValues.password
			}
		});
		
	}
	
	return(
		<StyledGQLLoginForm>
			<Mutation mutation={lgn} >
			{(login, {data, loading, error} ) =>{ if(data && 'jwt' in data.login){ console.log(data); setGQLJwt(data.login.jwt)} return (
				<>
					<form onSubmit={(e) => handleSubmit(e, login)}>
						<input type="text" placeholder="username" onChange={(e) => handleChange('username', e.target.value)}/>
						<input type="password" placeholder="password" onChange={(e) => handleChange('password', e.target.value)}/>
						<input type="submit" value="Login" />
					</form>
					
					{ loading && <p>Logging In...</p> }
					{ error && <p>Error Logging In.</p> }
				</>
			)}}
			</Mutation>
		</StyledGQLLoginForm>
	)
}