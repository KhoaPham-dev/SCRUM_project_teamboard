import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/category";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_CATEGORY_LIST,
} = actionTypes;

function* getCategoryList({ payload: {params} }){
    const apiParams = apiConfig.category.getCategoryList;
    const searchParams = { page: params.page, size: params.size };
    if(params && params.parentId){
        searchParams.parentId = params.parentId
    }

    if (params.search)
    {
        if (params.search.name)
            searchParams.name = params.search.name;
        if(params.search.kind)
            searchParams.kind = params.search.kind;
        if(params.search.status)
            searchParams.status = params.search.status;

    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type:defineActionSuccess(GET_CATEGORY_LIST),
            categoryListData: result.responseData && {
                ...result.responseData.data,
                parentId: params.parentId !== undefined ? params.parentId : -1
            },
            // path: params.path || {}
            // categoryId: result.responseData.data.id
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_CATEGORY_LIST) });
    }
}

function* getCategory ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.category.getById,
            path: `${apiConfig.category.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result,onCompleted,onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createCategory({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.category.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateCategory({payload: {params, onCompleted, onError}})
{
    // if(!params.parentId){
    //     params.parentId = 0;
    // }
    try{
        const result = yield call (sendRequest, apiConfig.category.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteCategory({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.category.delete,
            path: `${apiConfig.category.delete.path}/${params.id}`
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
    takeLatest(defineActionLoading(GET_CATEGORY_LIST), getCategoryList),
    takeLatest(actionTypes.GET_CATEGORY, getCategory),
    takeLatest(actionTypes.CREATE_CATEGORY, createCategory),
    takeLatest(actionTypes.UPDATE_CATEGORY, updateCategory),
    takeLatest(actionTypes.DELETE_CATEGORY, deleteCategory),
]

export default sagas;