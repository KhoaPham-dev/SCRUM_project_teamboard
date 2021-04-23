import {actionTypes, reduxUtil} from "../actions/voucher";


const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;

const {
    GET_VOUCHER_LIST,
} = actionTypes;

const initialState = {
    voucherListData: {},
    voucherListLoading: false,
}

const reducer = createReducer ({
    [defineActionLoading(GET_VOUCHER_LIST)] : (state) =>{
        return {
            ...state,
            voucherListLoading: true,
        }
    },
    [defineActionSuccess(GET_VOUCHER_LIST)] : (state, {voucherListData} ) =>{
        return {
            ...state,
            voucherListData,
            voucherListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};