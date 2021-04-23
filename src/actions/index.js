import { actions as appCommonActions, actionTypes as appCommonTypes } from './appCommon';
import { actions as accountActions, actionTypes as accountTypes } from './account';
import { actions as userActions, actionTypes as userTypes } from './user';
import { actions as groupPermissionActions, actionTypes as groupPermissionTypes } from './groupPermission';
import { actions as organizeActions, actionTypes as organizeActionsTypes} from "./organize";
import {actions as settingActions, actionTypes as settingTypes} from './setting';
import {actions as provinceActions, actionTypes as provinceTypes} from './province';

import {actions as categoryActions, actionTypes as categoryActionsTypes} from "./category";
import {actions as serviceActions, actionTypes as serviceActionsTypes} from "./service";
import {actions as newsActions, actionTypes as newsActionsTypes} from "./news";
import {actions as customerActions, actionTypes as customerActionsTypes} from "./customer";

import {actions as agencyActions, actionTypes as agencyActionsTypes} from "./agency";
import {actions as onlineStatusActions, actionTypes as onlineStatusActionsTypes} from "./onlineStatus";
import {actions as voucherActions, actionTypes as voucherActionsTypes} from "./voucher";
export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...userActions,
    ...groupPermissionActions,
    ...organizeActions,
    ...settingActions,
    ...provinceActions,
    ...categoryActions,
    ...serviceActions,
    ...newsActions,
    ...customerActions,
    ...agencyActions,
    ...onlineStatusActions,
    ...voucherActions,
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...userTypes,
    ...groupPermissionTypes,
    ...organizeActionsTypes,
    ...settingTypes,
    ...provinceTypes,
    ...categoryActionsTypes,
    ...serviceActionsTypes,
    ...newsActionsTypes,
    ...customerActionsTypes,
    ...agencyActionsTypes,
    ...onlineStatusActionsTypes,
    ...voucherActionsTypes,
}