import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const StyledApp = styled.div`
	width: 100vw;
	height: 100vh;
`

import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import rr from './Reducers/rootReducer.js';
import reduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

const store = applyMiddleware(reduxPromise,reduxThunk)(createStore)(rr);

import AppWrapper from './AppWrapper.js';

function App() {
	const [ GQLJwt, setGQLJwt ] = useState('');
	
	
	return(
		<StyledApp>
			
			<AppWrapper GQLJwt={GQLJwt} setGQLJwt={setGQLJwt} />
			
		</StyledApp>
	)
}

if (document.getElementById('react_root')) {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react_root'));
}	