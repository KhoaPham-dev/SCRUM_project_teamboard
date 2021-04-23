import { actionTypes, reduxUtil } from '../actions/province';

const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;
const {
    GET_PROVINCE_LIST,
    GET_PROVINCE_COMBOBOX,
} = actionTypes;

const initialState = { 
    provinceData: {},
    provinceCombobox: [],
    districtCombobox: [],
    wardCombobox: [],
    tbProvinceLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_PROVINCE_LIST)]: (state) => {
        return {
            ...state,
            tbProvinceLoading: true
        }
    },
    [defineActionSuccess(GET_PROVINCE_LIST)]: (state, { provinceData }) => {
        return {
            ...state,
            provinceData,
            tbProvinceLoading: false
        }
    },
    [defineActionSuccess(GET_PROVINCE_COMBOBOX)]: (state, { comboboxData, comboboxType }) => {
        state[comboboxType] = comboboxData;
        return {
            ...state,
        }
    },
    initialState
})

export default {
    reducer
};
