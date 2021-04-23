import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('ORGANIZE');
const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ORGANIZE: defineAction('GET_ORGANIZE'),
    CREATE_ORGANIZE: defineAction('CREATE_ORGANIZE'),
    DELETE_ORGANIZE: defineAction('DELETE_ORGANIZE'),
    UPDATE_ORGANIZE: defineAction('UPDATE_ORGANIZE'),
    GET_ORGANIZE_LIST: defineAction('GET_ORGANIZE_LIST'),
}

export const actions = {
    getOrganize: createAction(actionTypes.GET_ORGANIZE),
    createOrganize: createAction(actionTypes.CREATE_ORGANIZE),
    deleteOrganize: createAction(actionTypes.DELETE_ORGANIZE),
    updateOrganize: createAction(actionTypes.UPDATE_ORGANIZE),
    getOrganizeList: createActionWithLoading(actionTypes.GET_ORGANIZE_LIST),
}