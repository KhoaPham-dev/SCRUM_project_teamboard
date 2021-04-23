import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/agency";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_AGENCY_LIST,
    GET_PROVINCE_COMBOBOX_LIST,
    GET_DISTRICT_COMBOBOX_LIST,
    GET_WARD_COMBOBOX_LIST,
    GET_LIST_SERVICE_BY_AGENCY,
    GET_SERVICE_LIST1,
} = actionTypes;

function* getAgencyList({ payload: {params} }){
    const apiParams = apiConfig.agency.getAgencyList;
    const searchParams = { page: params.page, size: params.size };
    if (params.search)
    {
        if (params.search.fullName)
            searchParams.fullName = params.search.fullName;
        if(params.search.status)
            searchParams.status = params.search.status;
        if(params.search.phone)
            searchParams.phone = params.search.phone;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type:defineActionSuccess(GET_AGENCY_LIST),
            agencyListData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_AGENCY_LIST) });
    }
}

export function* getProvinceComboboxList({ payload: {params} }){
    const apiParams = apiConfig.agency.getProvinceComboboxList;
    const searchParams = {};
    if(params && params.parentId){
        searchParams.parentId = params.parentId
    }
    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type:defineActionSuccess(GET_PROVINCE_COMBOBOX_LIST),
            provinceComboboxList: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_PROVINCE_COMBOBOX_LIST) });
    }
}
export function* getDistrictComboboxList({ payload: {params} }){
    const apiParams = apiConfig.agency.getDistrictComboboxList;
    const searchParams = {};
    if(params && params.value){
        searchParams.parentId = params.value
    }
    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type:defineActionSuccess(GET_DISTRICT_COMBOBOX_LIST),
            districtComboboxList: result.responseData && {
                ...result.responseData.data,            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_DISTRICT_COMBOBOX_LIST) });
    }
}

export function* getWardComboboxList({ payload: {params} }){
    const apiParams = apiConfig.agency.getWardComboboxList;
    const searchParams = {};
    if(params && params.value){
        searchParams.parentId = params.value
    }
    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type:defineActionSuccess(GET_WARD_COMBOBOX_LIST),
            wardComboboxList: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_WARD_COMBOBOX_LIST) });
    }
}
function* getAgency ({payload:{params, onCompleted, onError}})
{
    try {
        const apiParams = {
            ...apiConfig.agency.getById,
            path: `${apiConfig.agency.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result,onCompleted,onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createAgency({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.agency.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateAgency({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.agency.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteAgency({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.agency.delete,
            path: `${apiConfig.agency.delete.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}



function* getListServiceByAgency({ payload: {params} }){
    const apiParams = {
        ...apiConfig.agency.getListServiceByAgency,
        path: `${apiConfig.agency.getListServiceByAgency.path}/${params}`
    }
    try {
        const result = yield call (sendRequest, apiParams);
        yield put ({
            type:defineActionSuccess(GET_LIST_SERVICE_BY_AGENCY),
            listServiceByAgency: result.responseData && {
                ...result.responseData,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_LIST_SERVICE_BY_AGENCY) });
    }
}

function* getServiceList1({ payload: {params} }){
    const apiParams = apiConfig.agency.getServiceList1;
    const searchParams = { };

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type:defineActionSuccess(GET_SERVICE_LIST1,),
            serviceList: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_SERVICE_LIST1,) });
    }
}

function* activeService({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.agency.activeService, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* addService({payload: {params, onCompleted, onError}})

{
    try{
        const result = yield call (sendRequest, apiConfig.agency.addService, params);
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
            ...apiConfig.agency.deleteService,
            path: `${apiConfig.agency.deleteService.path}/${params.id}`
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
    takeLatest(defineActionLoading(GET_AGENCY_LIST), getAgencyList),
    takeLatest(defineActionLoading(GET_PROVINCE_COMBOBOX_LIST), getProvinceComboboxList),
    takeLatest(defineActionLoading(GET_DISTRICT_COMBOBOX_LIST), getDistrictComboboxList),
    takeLatest(defineActionLoading(GET_WARD_COMBOBOX_LIST), getWardComboboxList),
    takeLatest(actionTypes.GET_AGENCY, getAgency),
    takeLatest(actionTypes.CREATE_AGENCY, createAgency),
    takeLatest(actionTypes.UPDATE_AGENCY, updateAgency),
    takeLatest(actionTypes.DELETE_AGENCY, deleteAgency),

    takeLatest(defineActionLoading(GET_LIST_SERVICE_BY_AGENCY), getListServiceByAgency),
    takeLatest(defineActionLoading(GET_SERVICE_LIST1), getServiceList1),

    takeLatest(actionTypes.ADD_SERVICE, addService),
    takeLatest(actionTypes.ACTIVE_SERVICE, activeService),
    takeLatest(actionTypes.DELETE_SERVICE, deleteService),
]
export default sagas;