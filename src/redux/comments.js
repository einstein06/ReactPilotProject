import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = {
        isLoading:true,
        errMes:null,
        comments:[]
    }, action) => {
    switch (action.type){
        case ActionTypes.ADD_COMMENTS :
            return {...state, isLoading:false, errMes : null, comments : action.payload};
            break;
        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading:false, errMes:action.payload, comments:[]};
            break;
        case ActionTypes.ADD_COMMENT :
            var comment = action.payload;
            // comment.id = state.comments.length;
            // comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return {...state, comments: state.comments.concat(comment)};
        default :
            return state;
    }
}