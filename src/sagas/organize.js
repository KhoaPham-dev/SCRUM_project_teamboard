import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/organize";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_ORGANIZE_LIST,
} = actionTypes;

function* getOrganizeList({ payload: {params} }){
    const apiParams = apiConfig.organize.getOrganizeList;
    const searchParams = { page: params.page, size: params.size }; //, kind: ("..."").organize
    if (params.search)
    {
        if (params.search.name)
            searchParams.name = params.search.name;
        if(params.search.status)
            searchParams.status = params.search.status;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type:defineActionSuccess(GET_ORGANIZE_LIST),
            organizeListData: result.responseData && result.responseData.data
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_ORGANIZE_LIST) });
    }
}

// function* searchOrganize({payload:{params}})
// {
//     const apiParams = apiConfig.organize.getOrganizeList;
//     try {
//         const result = yield call (sendRequest, apiParams,params);
//         yield put({
//             type: defineActionSuccess(SEARCH_ORGANIZE),
//             organizeListData: result.responseData.data && result.responseData.data.data
//         });
//     }
//     catch(error)
//     {        
//         yield put({ type: defineActionFailed(SEARCH_ORGANIZE_LIST) });
//     }
// }

function* getOrganize ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.organize.getById,
            path: `${apiConfig.organize.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result,onCompleted,onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createOrganize({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.organize.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateOrganize({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.organize.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteOrganize({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.organize.delete,
            path: `${apiConfig.organize.delete.path}/${params.id}`
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
    takeLatest(defineActionLoading(GET_ORGANIZE_LIST), getOrganizeList),
    takeLatest(actionTypes.GET_ORGANIZE, getOrganize),
    takeLatest(actionTypes.CREATE_ORGANIZE, createOrganize),
    takeLatest(actionTypes.UPDATE_ORGANIZE, updateOrganize),
    takeLatest(actionTypes.DELETE_ORGANIZE, deleteOrganize),
]

export default sagas;