import {actionTypes, reduxUtil} from "../actions/agency";


const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;

const {
    GET_AGENCY_LIST,
    GET_PROVINCE_COMBOBOX_LIST,
    GET_DISTRICT_COMBOBOX_LIST,
    GET_WARD_COMBOBOX_LIST,

    GET_LIST_SERVICE_BY_AGENCY,
    GET_SERVICE_LIST1,
} = actionTypes;

const initialState = {
    agencyListData: {},
    agencyListLoading: false,
    provinceComboboxList: {},
    provincecomboboxListLoading: false,
    districtComboboxList: {},
    districtcomboboxListLoading: false,
    wardComboboxList: {},
    wardcomboboxListLoading: false,

    listServiceByAgency: {},
    listServiceByAgencyLoading: false,
    serviceList: {},
    serviceListLoading: false,
}

const reducer = createReducer ({
    [defineActionLoading(GET_AGENCY_LIST,)] : (state) =>{
        return {
            ...state,
            agencyListLoading: true,
        }
    },
    [defineActionSuccess(GET_AGENCY_LIST,)] : (state, {agencyListData} ) =>{
        return {
            ...state,
            agencyListData,
            agencyListLoading: false,
        }
    },
    [defineActionLoading(GET_PROVINCE_COMBOBOX_LIST,)] : (state) =>{
        return {
            ...state,
            provincecomboboxListLoading: true,
        }
    },
    [defineActionSuccess(GET_PROVINCE_COMBOBOX_LIST,)] : (state, {provinceComboboxList} ) =>{
        return {
            ...state,
            provinceComboboxList,
            provincecomboboxListLoading: false,
        }
    },
    [defineActionLoading(GET_DISTRICT_COMBOBOX_LIST,)] : (state) =>{
        return {
            ...state,
            districtComboboxListLoading: true,
        }
    },
    [defineActionSuccess(GET_DISTRICT_COMBOBOX_LIST,)] : (state, {districtComboboxList} ) =>{
        return {
            ...state,
            districtComboboxList,
            districtComboboxListLoading: false,
        }
    },
    [defineActionLoading(GET_WARD_COMBOBOX_LIST,)] : (state) =>{
        return {
            ...state,
            wardcomboboxListLoading: true,
        }
    },
    [defineActionSuccess(GET_WARD_COMBOBOX_LIST,)] : (state, {wardComboboxList} ) =>{
        return {
            ...state,
            wardComboboxList,
            wardcomboboxListLoading: false,
        }
    },
    [defineActionLoading(GET_LIST_SERVICE_BY_AGENCY,)] : (state) =>{
        return {
            ...state,
            listServiceByAgencyLoading: true,
        }
    },
    [defineActionSuccess(GET_LIST_SERVICE_BY_AGENCY,)] : (state, {listServiceByAgency} ) =>{
        return {
            ...state,
            listServiceByAgency,
            listServiceByAgencyLoading: false,
        }
    },
    [defineActionLoading(GET_SERVICE_LIST1,)] : (state) =>{
        return {
            ...state,
            serviceListLoading: true,
        }
    },
    [defineActionSuccess(GET_SERVICE_LIST1)] : (state, {serviceList} ) =>{
        return {
            ...state,
            serviceList,
            serviceListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};