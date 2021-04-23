import { actionTypes, reduxUtil } from '../actions/customer';

const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;
const {
    GET_CUSTOMER_LIST,
} = actionTypes;

const initialState = { 
    customerData: {},
    tbCustomerLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_CUSTOMER_LIST)]: (state) => {
        return {
            ...state,
            tbCustomerLoading: true
        }
    },
    [defineActionSuccess(GET_CUSTOMER_LIST)]: (state, { customerData }) => {
        return {
            ...state,
            customerData,
            tbCustomerLoading: false
        }
    },
    initialState
})

export default {
    reducer
};
