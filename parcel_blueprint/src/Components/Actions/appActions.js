import axios from 'axios';

export default (action, data) => {
	switch(action) {
		case 'setWsId': 
		case 'addServer':
			return {
				type: action,
				payload:  {
					action,
					data
				}
			}	
			break;
		case 'getSliderOne':
			return async (dispatch, getState)=> {
				const result = await axios(`https://delilah.pr0con.com:1200/rest/get/slider-one`, { headers: {"Authorization" : `Bearer ${data.jwt}`}})
				console.log(result);
				
				let jo = JSON.parse(result.data.data);
				//console.log(jo);
				
				dispatch({
						type: action,
						payload: {
							action,
							data: jo.elements
						}
				})
			}	
			break;			
		default:
			break;
	}
}		