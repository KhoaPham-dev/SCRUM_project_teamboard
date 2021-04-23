import {actionTypes, reduxUtil} from "../actions/organize";


const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;

const {
    GET_ORGANIZE_LIST,
} = actionTypes;

const initialState = {

    organizeListData: [],
    organizeListLoading: false,
}

const reducer = createReducer ({
    [defineActionLoading(GET_ORGANIZE_LIST)] : (state) =>{
        return {
            ...state,
            organizeListLoading: true,
        }
    },
    [defineActionSuccess(GET_ORGANIZE_LIST)] : (state, {organizeListData}) =>{
        return {
            ...state,
            organizeListData,
            organizeListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};