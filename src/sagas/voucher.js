import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/voucher";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_VOUCHER_LIST,
    
} = actionTypes;

function* getVoucherList({ payload: {params} }){
    const apiParams = apiConfig.voucher.getVoucherList;
    const searchParams = { page: params.page, size: params.size };
    
    if (params.search)
    {
        if(params.search.voucherCode)
            searchParams.code = params.search.voucherCode;
        if(params.search.voucherSerial)
            searchParams.serial = params.search.voucherSerial;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type: defineActionSuccess(GET_VOUCHER_LIST),
            voucherListData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_VOUCHER_LIST) });
    }
}

function* getVoucher ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.voucher.getVoucherById,
            path: `${apiConfig.voucher.getVoucherById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createVoucher({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.voucher.createVoucher, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateVoucher({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.voucher.updateVoucher, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteVoucher({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.voucher.deleteVoucher,
            path: `${apiConfig.voucher.deleteVoucher.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_VOUCHER_LIST), getVoucherList),
    takeLatest(actionTypes.GET_VOUCHER_BY_ID, getVoucher),
    takeLatest(actionTypes.CREATE_VOUCHER, createVoucher),
    takeLatest(actionTypes.UPDATE_VOUCHER, updateVoucher),
    takeLatest(actionTypes.DELETE_VOUCHER, deleteVoucher),
]

export default sagas;