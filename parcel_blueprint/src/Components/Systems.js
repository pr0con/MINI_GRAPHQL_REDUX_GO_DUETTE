import React from "react";
import styled from 'styled-components';
import { Query } from 'react-apollo';

import ReactJson from 'react-json-view';

const StyledSystem = styled.div`
	
`;

export function Systems({q, GQLJwt}) {
	return(
		<StyledSystem>
			<Query query={q}>
				{({ data }) => {
					console.log(data);
					return (
						<ReactJson src={{ GQLJwt, data }} collapsed={true} />
					)
				}}
			</Query>
		</StyledSystem>
	)
}