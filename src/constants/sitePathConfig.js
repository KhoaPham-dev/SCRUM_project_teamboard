import apiConfig from './apiConfig';

export const sitePathConfig = {
    login: {
        path: '/login'
    },
    profile: {
        path: '/profile'
    },
    admin: {
        path: '/admins',
        permissions: [
            apiConfig.user.getAdminList.path,
            apiConfig.user.getAdminById.path,
            apiConfig.user.createAdmin.path,
            apiConfig.user.updateAdmin.path,
            apiConfig.user.deleteAdmin.path
        ]
    },
    organization:{
        path: '/organization',
        permissions: [
            apiConfig.organize.getOrganizeList.path,
            apiConfig.organize.getById.path,
            apiConfig.organize.create.path,
            apiConfig.organize.update.path,
            apiConfig.organize.delete.path,
        ]
    },
    forbidden: {
        path: '/forbidden'
    },
    setting: {
        path: '/settings',
        permissions: [
            apiConfig.setting.getSettingsList.path,
            apiConfig.setting.getSettingById.path,
            apiConfig.setting.createSetting.path,
            apiConfig.setting.updateSetting.path,
            apiConfig.setting.deleteSetting.path,
        ]
    },
    groupPermission: {
        path: '/groupPermission',
        permissions: [
            apiConfig.groupPermission.getList.path,
            apiConfig.groupPermission.getById.path,
            apiConfig.groupPermission.create.path,
            apiConfig.groupPermission.update.path,
            'not_have_delete',
            apiConfig.groupPermission.getPermissionList.path,
        ]
    },
    province: {
        path: '/province',
        permissions: [
            apiConfig.province.getProvinceList.path,
            apiConfig.province.getProvinceById.path,
            apiConfig.province.createProvince.path,
            apiConfig.province.updateProvince.path,
            apiConfig.province.deleteProvince.path,
        ]
    },
    category: {
        path: '/category',
        permissions: [
            apiConfig.category.getCategoryList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    categorychild: {
        path: '/category',
        permissions: [
            apiConfig.category.getCategoryList.path,
            apiConfig.category.getById.path,
            apiConfig.category.create.path,
            apiConfig.category.update.path,
            apiConfig.category.delete.path,
        ]
    },
    service:
    {
        path: '/service',
        permissions: [
            apiConfig.service.getServiceList.path,
            apiConfig.service.getById.path,
            apiConfig.service.create.path,
            apiConfig.service.update.path,
            apiConfig.service.delete.path,
            apiConfig.service.getComboboxList.path.substring(0, apiConfig.service.getComboboxList.path.length - 2),
        ]
    },
    servicechild:
    {
        path: '/service',
        permissions: [
            apiConfig.service.getServiceList.path,
            apiConfig.service.getById.path,
            apiConfig.service.create.path,
            apiConfig.service.update.path,
            apiConfig.service.delete.path,
            apiConfig.service.getComboboxList.path.substring(0, apiConfig.service.getComboboxList.path.length - 2),
        ]
    },
    news:{
        path: '/news',
        permissions: [
            apiConfig.news.getNewsList.path,
            apiConfig.news.getNewsById.path,
            apiConfig.news.createNews.path,
            apiConfig.news.updateNews.path,
            apiConfig.news.deleteNews.path,
            apiConfig.news.getComboboxNewsList.path.substring(0, apiConfig.news.getComboboxNewsList.path.length - 2),
        ]
    },
    customer:{
        path: '/customer',
        permissions: [
            apiConfig.customer.getCustomerList.path,
            apiConfig.customer.getCustomerById.path,
            'no_have_create',
            apiConfig.customer.updateCustomer.path,
            apiConfig.customer.deleteCustomer.path,
        ]
    },
    agency:{
        path: '/agency',
        permissions: [
            apiConfig.agency.getAgencyList.path,
            apiConfig.agency.getById.path,
            apiConfig.agency.create.path,
            apiConfig.agency.update.path,
            apiConfig.agency.delete.path,
            apiConfig.agency.getListServiceByAgency.path,
            apiConfig.agency.getServiceList1.path,
            apiConfig.agency.getProvinceComboboxList.path,
            apiConfig.agency.getDistrictComboboxList.path,
            apiConfig.agency.getWardComboboxList.path,
        ]
    },
    agencyservice:{
        path: '/agencyservice',
        // path: '/agency',
        permissions: [
            apiConfig.agency.getListServiceByAgency.path,
            // apiConfig.agency.getById.path,
            "not_have",
            apiConfig.agency.addService.path,
            apiConfig.agency.activeService.path,
            apiConfig.agency.deleteService.path,

        ]
    },
    onlineStatus: {
        path: '/onlineStatus',
        permissions: [
            apiConfig.onlineStatus.getOnlineStatusList.path,
            "not_have_getbyid",
            "not_have_create",
            "not_have_update",
            "not_have_delete",
            apiConfig.onlineStatus.getAutoComplexService.path,
        ]
    },
    voucher: {
        path: '/voucher',
        permissions: [
            apiConfig.voucher.getVoucherList.path,
            apiConfig.voucher.getVoucherById.path,
            apiConfig.voucher.createVoucher.path,
            apiConfig.voucher.updateVoucher.path,
            apiConfig.voucher.deleteVoucher.path,
        ]
    }
}