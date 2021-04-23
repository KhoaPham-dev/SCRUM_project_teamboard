import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('ONLINE_STATUS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ONLINE_STATUS_LIST: defineAction('GET_ONLINE_STATUS_LIST'),
    GET_AUTOCOMPLEX_SERVICE: defineAction('GET_AUTOCOMPLEX_SERVICE'),
}

export const actions = {
    getOnlineStatusList: createActionWithLoading(actionTypes.GET_ONLINE_STATUS_LIST),
    getAutocomplexService: createAction(actionTypes.GET_AUTOCOMPLEX_SERVICE),
}