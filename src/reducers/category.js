import {actionTypes, reduxUtil} from "../actions/category";


const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;

const {
    GET_CATEGORY_LIST,
} = actionTypes;

const initialState = {
    categoryListData: {},
    parent: [],
    categoryListLoading: false,
}

const reducer = createReducer ({
    [defineActionLoading(GET_CATEGORY_LIST,)] : (state) =>{
        return {
            ...state,
            categoryListLoading: true,
        }
    },
    [defineActionSuccess(GET_CATEGORY_LIST,)] : (state, {categoryListData, parent} ) =>{
        return {
            ...state,
            categoryListData,
            parent,
            categoryListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};