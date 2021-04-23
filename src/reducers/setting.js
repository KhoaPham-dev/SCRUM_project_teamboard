import { actionTypes, reduxUtil } from '../actions/setting';

const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;
const {
    GET_SETTINGS_LIST,
} = actionTypes;

const initialState = { 
    settingsData: [],
    tbSettingsLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_SETTINGS_LIST)]: (state) => {
        return {
            ...state,
            tbSettingsLoading: true
        }
    },
    [defineActionSuccess(GET_SETTINGS_LIST)]: (state, { settingsData }) => {
        return {
            ...state,
            settingsData,
            tbSettingsLoading: false
        }
    },
    initialState
})

export default {
    reducer
};
