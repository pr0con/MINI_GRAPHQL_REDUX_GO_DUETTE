const wsId = null;
const servers = [
	"master",
	"delilah",
	"xbin",
	"silence",
	"rk",
	"caos",
	"ghost",
	"nowhere",
	"s3v3n",
	"null",
	"var",
	"void",
]
const slider_one = [];


export default (state = {
	wsId,
	servers,
	slider_one,	
}, action) => {
	
	
	switch(action.type) {
		case "addServer":
			return {
				...state,
				servers: [ ...state.servers, action.payload.data],
			}
		case "setWsId":
			return {
				...state,
				wsId: action.payload.data
			}	
			break;
		case "getSliderOne":
			return {
				...state,
				slider_one: action.payload.data
			}
			break;									
		default:
			break;
	}
	
	
	return state;
}