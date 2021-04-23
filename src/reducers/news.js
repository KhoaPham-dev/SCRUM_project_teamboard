import {actionTypes, reduxUtil} from "../actions/news";


const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;

const {
    GET_NEWS_LIST,
    GET_COMBOBOX_NEWS_LIST,
} = actionTypes;

const initialState = {
    newsListData: {},
    newsListLoading: false,
    comboboxNewsListData: {},
    comboboxNewsListLoading: false,
}

const reducer = createReducer ({
    [defineActionLoading(GET_NEWS_LIST)] : (state) =>{
        return {
            ...state,
            newsListLoading: true,
        }
    },
    [defineActionSuccess(GET_NEWS_LIST)] : (state, {newsListData} ) =>{
        return {
            ...state,
            newsListData,
            newsListLoading: false,
        }
    },
    [defineActionLoading(GET_COMBOBOX_NEWS_LIST)] : (state) =>{
        return {
            ...state,
            comboboxNewsListLoading: true,
        }
    },
    [defineActionSuccess(GET_COMBOBOX_NEWS_LIST)] : (state, {comboboxNewsListData} ) =>{
        return {
            ...state,
            comboboxNewsListData,
            comboboxNewsListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};