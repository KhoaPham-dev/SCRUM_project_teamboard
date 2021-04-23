import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/news";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_NEWS_LIST,
    GET_COMBOBOX_NEWS_LIST,
    
} = actionTypes;

function* getNewsList({ payload: {params} }){
    const apiParams = apiConfig.news.getNewsList;
    const searchParams = { page: params.page, size: params.size };
    
    if (params.search)
    {
        if (params.search.newTitle)
            searchParams.title = params.search.newTitle;
        if(params.search.status)
            searchParams.status = params.search.status;
        if(params.search.categoryId)
            searchParams.categoryId = params.search.categoryId;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type: defineActionSuccess(GET_NEWS_LIST),
            newsListData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_NEWS_LIST) });
    }
}

function* getComboboxNewsList(){
    const apiParams = apiConfig.news.getComboboxNewsList;
    
    try {
        const result = yield call (sendRequest, apiParams);
        yield put ({
            type: defineActionSuccess(GET_COMBOBOX_NEWS_LIST),
            comboboxNewsListData: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_COMBOBOX_NEWS_LIST) });
    }
}

function* getNews ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.news.getNewsById,
            path: `${apiConfig.news.getNewsById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createNews({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.news.createNews, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateNews({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.news.updateNews, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteNews({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.news.deleteNews,
            path: `${apiConfig.news.deleteNews.path}/${params.id}`
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
    takeLatest(defineActionLoading(GET_NEWS_LIST), getNewsList),
    takeLatest(defineActionLoading(GET_COMBOBOX_NEWS_LIST), getComboboxNewsList),
    takeLatest(actionTypes.GET_NEWS_BY_ID, getNews),
    takeLatest(actionTypes.CREATE_NEWS, createNews),
    takeLatest(actionTypes.UPDATE_NEWS, updateNews),
    takeLatest(actionTypes.DELETE_NEWS, deleteNews),
]

export default sagas;