import { combineReducers } from 'redux';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import organize from "./organize";
import settings from './setting';
import province from './province';
import category from './category'
import service from './service';
import news from './news';
import customer from './customer';

import agency from './agency';
import onlineStatus from './onlineStatus';
import voucher from './voucher';

const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    user: user.reducer,
    groupPermission: groupPermission.reducer,
    organize: organize.reducer,
    settings: settings.reducer,
    province: province.reducer,
    category: category.reducer,
    service: service.reducer,
    news: news.reducer,
    customer: customer.reducer,
    agency: agency.reducer,
    onlineStatus: onlineStatus.reducer,
    voucher: voucher.reducer,
});

export default rootReducer;