import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('NEWS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_NEWS_LIST: defineAction('GET_NEWS_LIST'),
    GET_NEWS_BY_ID: defineAction('GET_NEWS_BY_ID'),
    CREATE_NEWS: defineAction('CREATE_NEWS'),
    UPDATE_NEWS: defineAction('UPDATE_NEWS'),
    DELETE_NEWS: defineAction('DELETE_NEWS'),
    GET_COMBOBOX_NEWS_LIST: defineAction('GET_COMBOBOX_NEWS_LIST'),
}

export const actions = {
    getNewsList: createActionWithLoading(actionTypes.GET_NEWS_LIST),
    getNewsById: createAction(actionTypes.GET_NEWS_BY_ID),
    createNews: createAction(actionTypes.CREATE_NEWS),
    updateNews: createAction(actionTypes.UPDATE_NEWS),
    deleteNews: createAction(actionTypes.DELETE_NEWS),
    getComboboxNewsList: createActionWithLoading(actionTypes.GET_COMBOBOX_NEWS_LIST),
}