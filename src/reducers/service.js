import {actionTypes, reduxUtil} from "../actions/service";


const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;

const {
    GET_SERVICE_LIST,
    GET_COMBOBOX_LIST,
} = actionTypes;

const initialState = {
    serviceListData: {},
    serviceListLoading: false,
    comboboxListData: {},
    comboboxListLoading: false,
}

const reducer = createReducer ({
    [defineActionLoading(GET_SERVICE_LIST,)] : (state) =>{
        return {
            ...state,
            serviceListLoading: true,
        }
    },
    [defineActionSuccess(GET_SERVICE_LIST,)] : (state, {serviceListData} ) =>{
        return {
            ...state,
            serviceListData,
            serviceListLoading: false,
        }
    },
    // [defineActionLoading(GET_COMBOBOX_LIST,)] : (state) =>{
    //     return {
    //         ...state,
    //         comboboxListLoading: true,
    //     }
    // },
    [defineActionSuccess(GET_COMBOBOX_LIST,)] : (state, {comboboxListData} ) =>{
        return {
            ...state,
            comboboxListData,
            comboboxListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};