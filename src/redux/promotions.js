import * as Actiontypes from "./ActionTypes";

export const Promotions = (state = {
        isLoading:true,
        errMes:null,
        promotions:[]
    }, action) => {
    switch (action.type){
        case Actiontypes.ADD_PROMOS :
            return {...state, isLoading:false, errMes : null, promotions : action.payload};
            break;
        case Actiontypes.PROMOS_LOADING:
            return {...state, isLoading:true, errMes : null, promotions : []};
            break;
        case Actiontypes.PROMOS_FAILED:
            return {...state, isLoading:false, errMes:action.payload};
            break;
        default :
            return state;
    }
}