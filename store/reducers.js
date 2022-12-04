import * as actions from './actions';

export const initialValue = { auth: {loading : true} };

const reducer = (state , action) => {
    switch(action.type) {
        case actions.AUTH :    
            return {...state, auth: action.payload}
        default: 
            return state
    }
}

export default reducer