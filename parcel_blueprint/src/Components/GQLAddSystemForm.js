import React, { useState } from "react";
import styled from 'styled-components';
import gql  from 'graphql-tag';
import { Mutation } from 'react-apollo';

const StyledGQLAddSystemForm = styled.div`
	
`;

const crsq = gql`
	mutation createSystem($name: String!) {
		createSystem(name: $name) {
			id,
			name
			services {
				name
			}
		}
	}
` 


export function GQLAddSystemForm({rq}) {
	const [ formValues, setFormValues ] = useState({ name: '' });

	const handleChange = (field, value) => {
		setFormValues({ [field]:value});
		
	}
	
	const handleSubmit = (e,f) => {
		e.preventDefault();	
		f({
			variables: {
				name: formValues.name
			}
		});
		console.log(formValues);
	}
	
	return(
		<StyledGQLAddSystemForm>
			<Mutation mutation={crsq} refetchQueries={[{
				query: rq
			}]} awaitRefetchQueries={true}>
			{(createSystem, {loading, error} ) => (		
				<>
					<form onSubmit={(e) => handleSubmit(e, createSystem)}>
						<input type="text" placeholder="name" onChange={(e) => handleChange('name', e.target.value)}/>
						<input type="submit" value="Add System" />
					</form>
					
					{ loading && <p>Adding System....</p> }
					{ error && <p>Error Adding System....</p> }					
				</>	
			)}
			</Mutation>
		</StyledGQLAddSystemForm>
	)
}	