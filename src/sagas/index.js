import { all } from 'redux-saga/effects';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import organize from './organize';
import setting from './setting';
import province from './province';
import category from './category';
import service from './service';
import news from './news';
import customer from './customer';

import agency from './agency';
import onlineStatus from './onlineStatus';
import voucher from './voucher';
const sagas = [
    ...appCommon,
    ...account,
    ...user,
    ...groupPermission,
    ...organize,
    ...setting,
    ...province,
    ...category,
    ...service,
    ...news,
    ...customer,
    ...agency,
    ...onlineStatus,
    ...voucher,
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;
