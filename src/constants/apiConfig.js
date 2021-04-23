const baseHeader = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
}

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data'
}

const apiConfig = {
    file: {
        upload: {
            path: '/v1/file/upload',
            method: 'POST',
            headers: multipartFormHeader
        }
    },
    account: {
        login: {
            path: '/v1/account/login',
            method: 'POST',
            headers: baseHeader
        },
        logout: {
            path: '/v1/account/logout',
            method: 'GET',
            headers: baseHeader
        },
        getAdminProfile: {
            path: '/v1/account/profile',
            method: 'GET',
            headers: baseHeader
        },
        getShopAccountProfile: {
            path: '/v1/shop_account/profile',
            method: 'GET',
            headers: baseHeader
        },
        updateShopAccountProfile: {
            path: '/v1/shop_account/update_profile',
            method: 'PUT',
            headers: baseHeader
        },
        updateProfileAdmin: {
            path: '/v1/account/update_profile_admin',
            method: 'PUT',
            headers: baseHeader
        }
    },
    user: {
        getAdminList: {
            path: '/v1/account/list',
            method: 'GET',
            headers: baseHeader
        },
        getAdminList: {
            path: '/v1/account/list',
            method: 'GET',
            headers: baseHeader
        },
        getAdminList: {
            path: '/v1/account/list',
            method: 'GET',
            headers: baseHeader
        },
        getAdminList: {
            path: '/v1/account/list',
            method: 'GET',
            headers: baseHeader
        },
        getAdminList: {
            path: '/v1/account/list',
            method: 'GET',
            headers: baseHeader
        },
        getAdminById: {
            path: '/v1/account/get',
            method: 'GET',
            headers: baseHeader
        },
        createAdmin: {
            path: '/v1/account/create_admin',
            method: 'POST',
            headers: baseHeader
        },
        updateAdmin: {
            path: '/v1/account/update_admin',
            method: 'PUT',
            headers: baseHeader
        },
        deleteAdmin: {
            path: '/v1/account/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getShopAccountList: {
            path: '/v1/shop_account/list',
            method: 'GET',
            headers: baseHeader
        },
        getShopAccountById: {
            path: '/v1/shop_account/get',
            method: 'GET',
            headers: baseHeader
        },
        createShopAccount: {
            path: '/v1/shop_account/create',
            method: 'POST',
            headers: baseHeader
        },
        updateShopAccount: {
            path: '/v1/shop_account/update',
            method: 'PUT',
            headers: baseHeader
        },
        deleteShopAccount: {
            path: '/v1/shop_account/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        searchShopAccount: {
            path: '/v1/shop_account/autocomplete',
            method: 'GET',
            headers: baseHeader
        },
    },
    groupPermission: {
        getList: {
            path: '/v1/group/list',
            method: 'GET',
            headers: baseHeader
        },
        getPermissionList: {
            path: '/v1/permission/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/group/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/group/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/group/update',
            method: 'PUT',
            headers: baseHeader
        },
        updateStatus: {
            path: '/v1/skills/status',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/skills',
            method: 'DELETE',
            headers: baseHeader
        },
    },
    organize: {
        getOrganizeList: {
            path: '/v1/organize/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/organize/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/organize/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/organize/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/organize/delete',
            method: 'DELETE',
            headers: baseHeader
        },
    },
    setting: {
        getSettingsList: {
            path: '/v1/settings/list',
            method: 'GET',
            headers: baseHeader
        },
        createSetting: {
            path: '/v1/settings/create',
            method: 'POST',
            headers: baseHeader
        },
        getSettingById: {
            path: '/v1/settings/get',
            method: 'GET',
            headers: baseHeader
        },
        updateSetting: {
            path: '/v1/settings/update',
            method: 'PUT',
            headers: baseHeader
        },
        deleteSetting: {
            path: '/v1/settings/delete',
            method: 'DELETE',
            headers: baseHeader
        }
    },
    province: {
        getProvinceList: {
            path: '/v1/province/list',
            method: 'GET',
            headers: baseHeader
        },
        createProvince: {
            path: '/v1/province/create',
            method: 'POST',
            headers: baseHeader
        },
        getProvinceById: {
            path: '/v1/province/get',
            method: 'GET',
            headers: baseHeader
        },
        updateProvince: {
            path: '/v1/province/update',
            method: 'PUT',
            headers: baseHeader
        },
        deleteProvince: {
            path: '/v1/province/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getProvinceCombobox: {
            path: '/v1/province/list_combobox',
            method: 'GET',
            headers: baseHeader
        }
    },
    category: {
        getCategoryList: {
            path: '/v1/category/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/category/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/category/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/category/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/category/delete',
            method: 'DELETE',
            headers: baseHeader
        },
    },
    service: {
        getServiceList: {
            path: '/v1/service/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/service/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/service/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/service/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/service/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getComboboxList: {
            path: '/v1/category/list_combobox/2',
            method: 'GET',
            headers: baseHeader
        },
    },
    news: {
        getNewsList: {
            path: '/v1/news/list',
            method: 'GET',
            headers: baseHeader
        },
        getNewsById: {
            path: '/v1/news/get',
            method: 'GET',
            headers: baseHeader
        },
        createNews: {
            path: '/v1/news/create',
            method: 'POST',
            headers: baseHeader
        },
        updateNews: {
            path: '/v1/news/update',
            method: 'PUT',
            headers: baseHeader
        },
        deleteNews: {
            path: '/v1/news/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getComboboxNewsList: {
            path: '/v1/category/list_combobox/1',
            method: 'GET',
            headers: baseHeader
        },
    },
    customer: {
        getCustomerList: {
            path: '/v1/customer/list',
            method: 'GET',
            headers: baseHeader
        },
        getCustomerById: {
            path: '/v1/customer/get',
            method: 'GET',
            headers: baseHeader
        },
        updateCustomer: {
            path: '/v1/customer/update',
            method: 'PUT',
            headers: baseHeader
        },
        deleteCustomer: {
            path: '/v1/customer/delete',
        }
    },
    agency: {
        getAgencyList: {
            path: '/v1/agency/list',
            method: 'GET',
            headers: baseHeader
        },
        getById: {
            path: '/v1/agency/get',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: '/v1/agency/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: '/v1/agency/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: '/v1/agency/delete',
            method: 'DELETE',
            headers: baseHeader
        },
        getProvinceComboboxList: {
            path: '/v1/province/list_combobox',
            method: 'GET',
            headers: baseHeader
        },
        getDistrictComboboxList: {
            path: '/v1/province/list_combobox',
            method: 'GET',
            headers: baseHeader
        },
        getWardComboboxList: {
            path: '/v1/province/list_combobox',
            method: 'GET',
            headers: baseHeader
        },
        getListServiceByAgency: {
            path: '/v1/agency/list-service-by-agency',
            method: 'GET',
            headers: baseHeader
        },
        getServiceList1: {
            path: '/v1/service/list',
            method: 'GET',
            headers: baseHeader
        },
        addService: {
            path: '/v1/agency/add-service',
            method: 'POST',
            headers: baseHeader
        },
        activeService: {
            path: '/v1/agency/active-service',
            method: 'POST',
            headers: baseHeader
        },
        deleteService: {
            path: '/v1/agency/delete-service',
            method: 'DELETE',
            headers: baseHeader
        },
    },
    onlineStatus: {
        getOnlineStatusList: {
            path: '/v1/agency/list_agency_online_admin',
            method: 'GET',
            headers: baseHeader
        },
        getAutoComplexService: {
            path: '/v1/service/autocomplex',
            method: 'GET',
            headers: baseHeader
        },
    },
    voucher: {
        getVoucherList: {
            path: '/v1/voucher/list',
            method: 'GET',
            headers: baseHeader
        },
        getVoucherById: {
            path: '/v1/voucher/get',
            method: 'GET',
            headers: baseHeader
        },
        createVoucher: {
            path: '/v1/voucher/create',
            method: 'POST',
            headers: baseHeader
        },
        updateVoucher: {
            path: '/v1/voucher/update',
            method: 'PUT',
            headers: baseHeader
        },
        deleteVoucher: {
            path: '/v1/voucher/delete',
            method: 'DELETE',
            headers: baseHeader
        },
    },
}

export default apiConfig;
