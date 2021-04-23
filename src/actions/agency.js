import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('AGENCY');
const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_AGENCY: defineAction('GET_AGENCY'),
    CREATE_AGENCY: defineAction('CREATE_AGENCY'),
    DELETE_AGENCY: defineAction('DELETE_AGENCY'),
    UPDATE_AGENCY: defineAction('UPDATE_AGENCY'),
    GET_AGENCY_LIST: defineAction('GET_AGENCY_LIST'),
    GET_PROVINCE_COMBOBOX_LIST: defineAction('GET_PROVINCE_COMBOBOX_LIST'),
    GET_DISTRICT_COMBOBOX_LIST: defineAction('GET_DISTRICT_COMBOBOX_LIST'),
    GET_WARD_COMBOBOX_LIST: defineAction('GET_WARD_COMBOBOX_LIST'),

    GET_LIST_SERVICE_BY_AGENCY: defineAction('GET_LIST_SERVICE_BY_AGENCY'),
    GET_SERVICE_LIST1: defineAction('GET_SERVICE_LIST1'),
    
    ADD_SERVICE: defineAction('ADD_SERVICE'),
    ACTIVE_SERVICE: defineAction('ACTIVE_SERVICE'),
    DELETE_SERVICE: defineAction('DELETE_SERVICE'),
}

export const actions = {
    getAgency: createAction(actionTypes.GET_AGENCY),
    createAgency: createAction(actionTypes.CREATE_AGENCY),
    deleteAgency: createAction(actionTypes.DELETE_AGENCY),
    updateAgency: createAction(actionTypes.UPDATE_AGENCY),
    getAgencyList: createActionWithLoading(actionTypes.GET_AGENCY_LIST),
    getProvinceComboboxList: createActionWithLoading(actionTypes.GET_PROVINCE_COMBOBOX_LIST),
    getDistrictComboboxList: createActionWithLoading(actionTypes.GET_DISTRICT_COMBOBOX_LIST),
    getWardComboboxList: createActionWithLoading(actionTypes.GET_WARD_COMBOBOX_LIST),

    getListServiceByAgency: createActionWithLoading(actionTypes.GET_LIST_SERVICE_BY_AGENCY),
    getServiceList1: createActionWithLoading(actionTypes.GET_SERVICE_LIST1),
    addService: createAction(actionTypes.ADD_SERVICE),
    activeService: createAction(actionTypes.ACTIVE_SERVICE),
    deleteService: createAction(actionTypes.DELETE_SERVICE),
    // addService: createActionWithLoading(actionTypes.ADD_SERVICE),
    // activeService: createActionWithLoading(actionTypes.ACTIVE_SERVICE),
}