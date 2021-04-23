import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('CATEGORY');
const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_CATEGORY: defineAction('GET_CATEGORY'),
    CREATE_CATEGORY: defineAction('CREATE_CATEGORY'),
    DELETE_CATEGORY: defineAction('DELETE_CATEGORY'),
    UPDATE_CATEGORY: defineAction('UPDATE_CATEGORY'),
    GET_CATEGORY_LIST: defineAction('GET_CATEGORY_LIST'),
}

export const actions = {
    getCategory: createAction(actionTypes.GET_CATEGORY),
    createCategory: createAction(actionTypes.CREATE_CATEGORY),
    deleteCategory: createAction(actionTypes.DELETE_CATEGORY),
    updateCategory: createAction(actionTypes.UPDATE_CATEGORY),
    getCategoryList: createActionWithLoading(actionTypes.GET_CATEGORY_LIST),
}