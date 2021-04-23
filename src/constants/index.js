const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    contentRootUrl: `${process.env.REACT_APP_API}/v1/file/download`,
    langKey: 'vi'
};

const StorageKeys = {
    userData: 'hqtech-user-data'
}

const LayoutConfigs = {
    NAV_WIDTH_EXPANDED: 220,
    NAV_WIDTH_COLLAPSED: 80
}

const UserTypes = {
    ADMIN: 1,
    SHOP: 2
}

const GroupPermissonTypes = {
    ADMIN: 1,
    AGENCY: 2,
    CUSTOMER: 3
}

const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO'
}

const ProvinceKinds = {
    province: {
        name: 'PROVINCE_KIND_PROVINCE',
        level: 1,
        text: 'Province'
    },
    district: {
        name: 'PROVINCE_KIND_DISTRICT',
        level: 2,
        text: 'District'
    },
    ward: {
        name: 'PROVINCE_KIND_WARD',
        level: 3,
        text: 'Ward'
    }
}

//Initial position Maps
//DH SPKT
export const InitialPosition = {
    lat: 10.849534,
    lng: 106.773337
}


// Pagination config
export const DEFAULT_TABLE_ITEM_SIZE = 10;
export const DATE_FORMAT_DISPLAY = 'DD-MM-YYYY';
export const DATE_FORMAT_VALUE = 'DD/MM/YYYY';
export const TIME_FORMAT_DISPLAY = 'HH:mm';

// Common status
export const STATUS_INACTIVE = 0;
export const STATUS_ACTIVE = 1;
export const STATUS_LOCK = -1;
export const STATUS_DELETE = -2;
export const API_KEY_MAP = "AIzaSyAvVsV59u5TbTpnGS2behP1nqRptqfOLc4";


export {
    AppConstants,
    StorageKeys,
    LayoutConfigs,
    UserTypes,
    GroupPermissonTypes,
    UploadFileTypes,
    ProvinceKinds
};
