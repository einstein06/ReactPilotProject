import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Leaders } from "./leaders";
import { Comments } from "./comments";
import {Promotions} from "./promotions";
import {Dishes} from "./dishes";
import {createForms} from 'react-redux-form';
import {InitialFeedback} from "./forms";

// import {initialState, Reducer} from "./reducer";

export const ConfigureStore = () => {

    const store = createStore(
        combineReducers({
            dishes : Dishes,
            comments : Comments,
            promotions : Promotions,
            leaders : Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    )

    return store;

};

