import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/onlineStatus';
import apiConfig from '../constants/apiConfig';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_ONLINE_STATUS_LIST,
    GET_AUTOCOMPLEX_SERVICE,
} = actionTypes;


function* getOnlineStatusList({ payload: { params } }) {

    const apiParams = apiConfig.onlineStatus.getOnlineStatusList;
    const searchParams = { };
    if(params.search) {
        if(params.search.serviceId) {
            searchParams.serviceId = params.search.serviceId
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_ONLINE_STATUS_LIST),
            onlineStatusData: result.responseData && result.responseData.data
        });
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_ONLINE_STATUS_LIST) });
    }
}

function* getAutocomplexService({ payload: { params } }) {

    const apiParams = apiConfig.onlineStatus.getAutoComplexService;
    const searchParams = { };
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_AUTOCOMPLEX_SERVICE),
            autocomplexService: result.responseData && result.responseData.data
        });
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_AUTOCOMPLEX_SERVICE) });
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_ONLINE_STATUS_LIST), getOnlineStatusList),
    takeLatest(actionTypes.GET_AUTOCOMPLEX_SERVICE, getAutocomplexService),
]

export default sagas;