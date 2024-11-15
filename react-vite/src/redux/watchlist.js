import { normalizer } from './utils';

/** Action Type Constants: */

const LOAD_WATCHLIST = "watchlists/LOAD_WATCHLISTS"
const ADD_TO_WATCHLIST = 'watchlist/ADD_TO_WATCHLIST'
const REMOVE_FROM_WATCHLIST = 'watchlist/REMOVE_FROM_WATCHLIST'


/**  Action Creators: */
const loadWatchlist = (watchlist) => {
    return {
        type: LOAD_WATCHLIST,
        payload: watchlist
    }
}

const addToWatchlist = (stock) => {
    return {
        type: ADD_TO_WATCHLIST,
        payload: stock
    }
}

const removeFromWatchlist = (stock) => {
    return {
        type: REMOVE_FROM_WATCHLIST,
        payload: stock
    }
}


/** Thunk Action Creators: */

// get all watchlist
export const getAllWatchlistThunk=() => async(dispatch) => {
    const res = await fetch('/api/watchlist/current');

    if (res.ok) {
        const watchlist = await res.json();
        dispatch(loadWatchlist(watchlist.watchlist_stocks))
    } else{
        const error = await res.json();
        throw error;
    }
}


// add to watchlist
export const addToWatchlistThunk =(stockId) => async(dispatch) => {
    
    const res = await fetch(`/api/watchlist/${stockId}/current`, {
        method: 'POST'
    })

    if (res.ok){
        const stockToAdd = await res.json()
        dispatch(addToWatchlist(stockToAdd))
    } else{
        const error = await res.json()
        throw error
    }

} 

// Remove from watchlist thunk

export const removeFromWatchlistThunk =(stockId) => async(dispatch) => {
    const res = await fetch(`/api/watchlist/${stockId}/current`, {
        method: 'DELETE'
    })

    if (res.ok){
        const result = await res.json();
        dispatch(removeFromWatchlist(stockId))
        return result;
    } else{
        const error = await res.json()
        throw error
    }

} 


/** Reducers: */

const watchlistReducer = (state={}, action) =>{
    switch(action.type){
        case(LOAD_WATCHLIST):{
            return {...state, ...normalizer(action.payload)}
        }
        case(ADD_TO_WATCHLIST):{
            const stockToAdd = action.payload;
            return {...state, [stockToAdd.id]: stockToAdd}
        }
        case REMOVE_FROM_WATCHLIST: {
            let newState = { ...state };
            const stockId = action.payload;
        
            let watchlist_to_remove = newState[stockId];
        
            // Delete the watchlist item if found
            if (watchlist_to_remove != null) {
                delete newState[watchlist_to_remove.id];
            }

            return newState;
        }
        
        default:
            return state;
    }
}


export default watchlistReducer