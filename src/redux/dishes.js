import { DISHES } from '../shared/dishes';
import * as Actiontypes from './ActionTypes';

export const Dishes = (state = { isLoading : true,
    errMes : null,
    dishes : []},
    action) => {
        switch (action.type){
            case Actiontypes.ADD_DISHES :
                return {...state, isLoading:false, errMes : null, dishes : action.payload};
                break;
            case Actiontypes.DISHES_LOADING:
                return {...state, isLoading:true, errMes : null, dishes : []};
                break;
            case Actiontypes.DISHES_FAILED:
                return {...state, isLoading:false, errMes:action.payload};
                break;
            default :
                return state;
        }
}