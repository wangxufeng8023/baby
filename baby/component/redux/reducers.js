const initialState={c:0};
export const calculate =(state=initialState,action)=>{

	switch(action.type){
		case 'PLUS':
		return {c:state.c+action.number};
		default:
		return state;
	}
}


