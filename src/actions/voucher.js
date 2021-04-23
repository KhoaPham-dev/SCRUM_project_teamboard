import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('VOUCHER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_VOUCHER_LIST: defineAction('GET_VOUCHER_LIST'),
    GET_VOUCHER_BY_ID: defineAction('GET_VOUCHER_BY_ID'),
    CREATE_VOUCHER: defineAction('CREATE_VOUCHER'),
    UPDATE_VOUCHER: defineAction('UPDATE_VOUCHER'),
    DELETE_VOUCHER: defineAction('DELETE_VOUCHER'),
}

export const actions = {
    getVoucherList: createActionWithLoading(actionTypes.GET_VOUCHER_LIST),
    getVoucherById: createAction(actionTypes.GET_VOUCHER_BY_ID),
    createVoucher: createAction(actionTypes.CREATE_VOUCHER),
    updateVoucher: createAction(actionTypes.UPDATE_VOUCHER),
    deleteVoucher: createAction(actionTypes.DELETE_VOUCHER),
}