// react-vite/src/redux/portfolio.js

const GET_USER_STOCKS = 'portfolio/getUserStocks';
const ADD_USER_STOCK = 'portfolio/addUserStock';
const REMOVE_USER_STOCK = 'portfolio/removeUserStock';
const UPDATE_USER_STOCK = 'portfolio/updateUserStock';
const initialState = {
    userStocks: []
};

// Action Creators
export const getUserStocksAction = (userStocks) => {
    return {
        type: GET_USER_STOCKS,
        userStocks
    };
};

export const addUserStockAction = (stock) => {
    return {
        type: ADD_USER_STOCK,
        stock
    };
};

export const removeUserStockAction = (stockId) => {
    return {
        type: REMOVE_USER_STOCK,
        stockId
    };
};

export const updateUserStockAction = (stock) => {
    return {
        type: UPDATE_USER_STOCK,
        stock
    };
};

// Thunk Actions
export const getUserStocksThunk = () => async (dispatch) => {
    const response = await fetch('/api/portfolio/current', {
        method: 'GET'
    });
    const data = await response.json();
    dispatch(getUserStocksAction(data.portfolio_stocks));
    return response;
};

export const addUserStockThunk = (stockId, stockData) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/${stockId}/current`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockData)
    });
    const data = await response.json();
    dispatch(addUserStockAction(data.stock));
    return data;
};

export const removeUserStockThunk = (stockId) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/${stockId}/current`, {
        method: 'DELETE'
    });
    const data = await response.json();
    dispatch(removeUserStockAction(stockId));
    return data;
};

export const updateUserStockThunk = (stockId, stockData) => async (dispatch) => {
    const response = await fetch(`/api/portfolio/${stockId}/current`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockData)
    });
    const data = await response.json();
    dispatch(updateUserStockAction(data.stock));
    return data;
};

// Reducer
const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_STOCKS:
            return {...state, userStocks: action.userStocks};
        case ADD_USER_STOCK:
            return {...state, userStocks: [...state.userStocks, action.stock]};
        case REMOVE_USER_STOCK:
            return {...state, userStocks: state.userStocks.filter(stock => stock.id !== action.stockId)};
        case UPDATE_USER_STOCK:
            return {...state, userStocks: state.userStocks.map(stock => (stock.id === action.stock.id ? action.stock : stock))};
        default:
            return state;
    }
};

export default portfolioReducer;