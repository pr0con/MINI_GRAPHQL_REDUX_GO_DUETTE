import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';


import { connect } from 'react-redux';

import appActions from './Actions/appActions.js';
import { bindActionCreators } from 'redux';


const StyledAppWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	
	
	& .app-wrapper-title {
		width: 100%;
		height: 5rem;
		font-size: 2.4rem;
		line-height: 5rem;
		text-align: center;
	}
	#app-wrapper-left,
	#app-wrapper-right {
		padding: .5rem;
	}
	#app-wrapper-left {
		border-right: 1px solid #000;
	}	
`;

import { GraphQl } from './GraphQl.js';
import { SlickSlider } from './SlickSlider.js';	

function AppWrapper(props) {
	const [ newServer, setNewServer ] = useState('');

	useEffect(() => {
		//props.appActions('testThunk')
		const ws = new WebSocket('wss://delilah.pr0con.com:1200/ws');
		ws.onopen = function(open_event) {	
	
			ws.onmessage = function(event) {
				console.log(event);
				let tjo = JSON.parse(event.data);	
				switch(tjo['type']) {
					case "client-websocket-id":
						//console.log(tjo['data']);
						props.appActions('setWsId', tjo['data'])
						break;
					default:
						break;
				}
			}
			
			ws.onclose = function(close_event) {
				console.log(close_event);
			}
			
			ws.onerror = function(error_event) {
				console.log(error_event);
			}			
		}		
	},[])
	
	useEffect(() => {
		props.appActions('getSliderOne', {jwt: 'junk'});
	},[])

	return(
		<StyledAppWrapper>
			<div id="app-wrapper-left">
				<div className="app-wrapper-title">React & GraphQl</div>
				<GraphQl GQLJwt={props.GQLJwt}  setGQLJwt={props.setGQLJwt}/>
			</div>
			<div id="app-wrapper-right">
				<div className="app-wrapper-title">React Redux & Hooks</div>
						
				<ReactJson src={props.appData} collapsed={false} />
				
				<SlickSlider elements={props.appData.slider_one} />
				
				<div id="update-servers-form"> 
					<input type="text" placeholder="server name" onChange={(e) => setNewServer(e.target.value)} />
					<input type="submit" value="Submit" onClick={(e) => props.appActions('addServer', newServer ) }/>
				</div>			
			</div>
		</StyledAppWrapper>
	)	
}


function mapStateToProps(state){
	return{
		appData: state.app, 
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators ({
		appActions : appActions,
	},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AppWrapper)