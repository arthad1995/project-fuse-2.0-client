import { fromJS } from 'immutable'


export const async_base = (base_name) => {
    return (state = not_loaded, action)=>{
        switch(action.type){
            case `${base_name}_PENDING`:
                return state.set('fetching', true).set('fetched', false)
                case `${base_name}_REJECTED`: 
                return state.set('fetching', false)
                                        .set('fetched', false)
                                        .set('error', action.payload)
                case `${base_name}_FULFILLED`:
                return state.set('fetching', false)
                                        .set('fetched', true)
                                        .merge(fromJS(action.payload.data))
        }
        return state;
    }
}
