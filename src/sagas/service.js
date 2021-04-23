import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/service";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_SERVICE_LIST,
    GET_COMBOBOX_LIST,
    
} = actionTypes;

function* getServiceList({ payload: {params} }){
    const apiParams = apiConfig.service.getServiceList;
    const searchParams = { page: params.page, size: params.size };
    if(Number(params.parentId) === -1){
        delete params.parentId;
    }
    if(params.parentId || params.parentId === 0){
        searchParams.parentId = params.parentId
    }

    if (params.search)
    {
        if (params.search.name)
            searchParams.name = params.search.name;
        if(params.search.status)
            searchParams.status = params.search.status;
        if(params.search.categoryId)
            searchParams.categoryId = params.search.categoryId;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type:defineActionSuccess(GET_SERVICE_LIST),
            serviceListData: result.responseData && {
                ...result.responseData.data,
                parentId: params.parentId !== undefined ? params.parentId : -1
            },
            // path: params.path || {}
            // serviceId: result.responseData.data.id
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_SERVICE_LIST) });
    }
}

function* getComboboxList(){
    const apiParams = apiConfig.service.getComboboxList;
    //const searchParams = { page: params.page, size: params.size };
    // if(Number(params.parentId) === -1){
    //     delete params.parentId;
    // }
    // if(params.parentId || params.parentId === 0){
    //     searchParams.parentId = params.parentId
    // }

    // if (params.search)
    // {
    //     if (params.search.name)
    //         searchParams.name = params.search.name;
    //     if(params.search.status)
    //         searchParams.status = params.search.status;
    // }

    try {
        const result = yield call (sendRequest, apiParams);
        yield put ({
            type:defineActionSuccess(GET_COMBOBOX_LIST),
            comboboxListData: result.responseData && {
                ...result.responseData.data,
                //parentId: params.parentId !== undefined ? params.parentId : -1
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_COMBOBOX_LIST) });
    }
}

function* getService ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.service.getById,
            path: `${apiConfig.service.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result,onCompleted,onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createService({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.service.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateService({payload: {params, onCompleted, onError}})
{
    // if(!params.parentId){
    //     params.parentId = 0;
    // }
    try{
        const result = yield call (sendRequest, apiConfig.service.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteService({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.service.delete,
            path: `${apiConfig.service.delete.path}/${params.id}`
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
    takeLatest(defineActionLoading(GET_SERVICE_LIST), getServiceList),
    takeLatest(defineActionLoading(GET_COMBOBOX_LIST), getComboboxList),
    takeLatest(actionTypes.GET_SERVICE, getService),
    takeLatest(actionTypes.CREATE_SERVICE, createService),
    takeLatest(actionTypes.UPDATE_SERVICE, updateService),
    takeLatest(actionTypes.DELETE_SERVICE, deleteService),
]

export default sagas;