import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('SERVICE');
const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_SERVICE: defineAction('GET_SERVICE'),
    CREATE_SERVICE: defineAction('CREATE_SERVICE'),
    DELETE_SERVICE: defineAction('DELETE_SERVICE'),
    UPDATE_SERVICE: defineAction('UPDATE_SERVICE'),
    GET_SERVICE_LIST: defineAction('GET_SERVICE_LIST'),
    GET_COMBOBOX_LIST: defineAction('GET_COMBOBOX_LIST'),
}

export const actions = {
    getService: createAction(actionTypes.GET_SERVICE),
    createService: createAction(actionTypes.CREATE_SERVICE),
    deleteService: createAction(actionTypes.DELETE_SERVICE),
    updateService: createAction(actionTypes.UPDATE_SERVICE),
    getServiceList: createActionWithLoading(actionTypes.GET_SERVICE_LIST),
    getComboboxList: createActionWithLoading(actionTypes.GET_COMBOBOX_LIST),
}