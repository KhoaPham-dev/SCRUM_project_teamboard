import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/province';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_PROVINCE_LIST,
    CREATE_PROVINCE,
    GET_PROVINCE_BY_ID,
    UPDATE_PROVINCE,
    DELETE_PROVINCE,
    GET_PROVINCE_COMBOBOX,
} = actionTypes;


function* getProvinceList({ payload: { params } }) {

    const apiParams = apiConfig.province.getProvinceList;
    const searchParams = { page: params.page, size: params.size };
    if(params.kind){
        searchParams.kind = params.kind
    }
    if(!params.parentId && params.parentId !== 0){
        delete params.parentId;
    }
    if(params.parentId || params.parentId === 0){
        searchParams.parentId = params.parentId
    }
    if(params.search) {
        if(params.search.name) {
            searchParams.name = params.search.name
        }
        if(params.search.status || params.search.status === 0) {
            searchParams.status = params.search.status
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_PROVINCE_LIST),
            provinceData: result.responseData &&
            { ...result.responseData.data,
                kind: params.kind,
                parentId: params.parentId
            },
        });
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_PROVINCE_LIST) });
    }
}

function* createProvince({payload: { params, onCompleted, onError }}){
    try {
        const apiParams = apiConfig.province.createProvince;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* getProvinceById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.province.getProvinceById,
            path: `${apiConfig.province.getProvinceById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* updateProvince({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.province.updateProvince;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* deleteProvince({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.province.deleteProvince,
            path: `${apiConfig.province.deleteProvince.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* getProvinceCombobox({ payload: { params } }){
    try {
        const apiParams = apiConfig.province.getProvinceCombobox;
        const searchParams = {};
        if(params.province && params.province.isClearThisComboxType){
            yield put ({
                type: defineActionSuccess(GET_PROVINCE_COMBOBOX),
                comboboxData: [],
                comboboxType: params.province.comboboxType
            })
        }
        else{
            if(params.province){
                searchParams.parentId = params.province.parentId
            }
            const result = yield call (sendRequest, apiParams, searchParams);
            yield put ({
                type: defineActionSuccess(GET_PROVINCE_COMBOBOX),
                comboboxData: result.responseData && result.responseData.data && result.responseData.data.data,
                comboboxType: searchParams.parentId ? params.province.comboboxType : 'provinceCombobox'
            })
        }
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_PROVINCE_COMBOBOX) });
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_PROVINCE_LIST), getProvinceList),
    takeLatest(CREATE_PROVINCE, createProvince),
    takeLatest(GET_PROVINCE_BY_ID, getProvinceById),
    takeLatest(UPDATE_PROVINCE, updateProvince),
    takeLatest(DELETE_PROVINCE, deleteProvince),
    takeEvery(GET_PROVINCE_COMBOBOX, getProvinceCombobox),
]

export default sagas;