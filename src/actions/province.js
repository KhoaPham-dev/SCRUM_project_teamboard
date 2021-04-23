import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('PROVINCE');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_PROVINCE_LIST: defineAction('GET_PROVINCE_LIST'),
    CREATE_PROVINCE: defineAction('CREATE_PROVINCE'),
    GET_PROVINCE_BY_ID: defineAction('GET_PROVINCE_BY_ID'),
    UPDATE_PROVINCE: defineAction('UPDATE_PROVINCE'),
    DELETE_PROVINCE: defineAction('DELETE_PROVINCE'),
    GET_PROVINCE_COMBOBOX: defineAction('GET_PROVINCE_COMBOBOX'),
}

export const actions = {
    getProvinceList: createActionWithLoading(actionTypes.GET_PROVINCE_LIST),
    createProvince: createAction(actionTypes.CREATE_PROVINCE),
    getProvinceById: createAction(actionTypes.GET_PROVINCE_BY_ID),
    updateProvince: createAction(actionTypes.UPDATE_PROVINCE),
    deleteProvince: createAction(actionTypes.DELETE_PROVINCE),
    getProvinceCombobox: createAction(actionTypes.GET_PROVINCE_COMBOBOX),
}