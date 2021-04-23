import { actionTypes, reduxUtil } from '../actions/onlineStatus';

const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;
const {
    GET_ONLINE_STATUS_LIST,
    GET_AUTOCOMPLEX_SERVICE,
} = actionTypes;

const initialState = { 
    onlineStatusData: {},
    mapOnlineStatusLoading: false,
    autocomplexService: {}
};

const reducer = createReducer({
    [defineActionLoading(GET_ONLINE_STATUS_LIST)]: (state) => {
        return {
            ...state,
            mapOnlineStatusLoading: true
        }
    },
    [defineActionSuccess(GET_ONLINE_STATUS_LIST)]: (state, { onlineStatusData }) => {
        return {
            ...state,
            onlineStatusData,
            mapOnlineStatusLoading: false
        }
    },
    [defineActionSuccess(GET_AUTOCOMPLEX_SERVICE)]: (state, { autocomplexService }) => {
        return {
            ...state,
            autocomplexService,
        }
    },
    initialState
})

export default {
    reducer
};
