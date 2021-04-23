import React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { sitePathConfig } from '../constants/sitePathConfig';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import LoginPage from '../containers/account/LoginPage';
import ProfilePage from '../containers/account/ProfilePage';

// import DashBoard from '../containers/Dashboard';
import UserAdminListPage from '../containers/users/UserAdminListPage';

import NotFound from '../compoments/common/NotFound';
import Forbidden from '../containers/Forbidden';
import OrganizeListPage from "../containers/organize/OrganizeListPage";
// import ErrorServer from '../containers/ErrorServer';
// import Layout from '../components/layout/Layout';
import SettingsListPage from '../containers/settings/SettingsListPage';
import GroupPermissionListPage from '../containers/groupPermission/GroupPermissionListPage';
import ProvinceListPage from '../containers/province/ProvinceListPage';


import CategoryListPage from '../containers/category/CategoryListPage';
import CategoryListPageChild from '../containers/category/CategoryListPageChild';
import ServiceListPage from "../containers/service/ServiceListPage";
// import ServiceListPageChild from "../containers/service/ServiceListPageChild"
import NewsListPage from "../containers/news/NewsListPage";
import CustomerListPage from "../containers/customer/CustomerListPage";
import AgencyListPage from "../containers/agency/AgencyListPage";
import AgencyServiceListPage from "../containers/agency/AgencyServiceListPage";
import OnlineStatusListPage from "../containers/onlineStatus/OnlineStatusListPage";
import VoucherListPage from "../containers/voucher/VoucherListPage";
const RootRoute = () => {
    const {
        admin,
        login,
        profile,
        forbidden,
        organization,
        setting,
        groupPermission,
        province,
        category,
        service,
        news,
        customer,
        agency,
        agencyservice,
        onlineStatus,
        voucher,
    } = sitePathConfig;

    return (
        <BrowserRouter>
            <Switch>
                {/* <Redirect exact from="/" to="/delivery/deliveryorder"/>
                {
                    routes.map((MyRoute, index) => ({...MyRoute, key: index}))
                } */}
                <Redirect exact from="/" to={{
                    pathname: admin.path,
                    state: { isRedirectToHomePage: true }
                }}/>
                <PublicRoute exact path={login.path} component={LoginPage} />
                <PrivateRoute exact path={profile.path} component={ProfilePage}/>
                <PrivateRoute exact path={admin.path} component={UserAdminListPage}/>
                <PrivateRoute exact path={organization.path} component={OrganizeListPage}/>
                <PrivateRoute exact path={setting.path} component={SettingsListPage}/>
                <PrivateRoute exact path={groupPermission.path} component={GroupPermissionListPage}/>
                <PrivateRoute exact path={province.path} component={ProvinceListPage}/>
                <PrivateRoute exact path={category.path} component={CategoryListPage}/>
                <PrivateRoute path={category.path} component={CategoryListPageChild}/>
                <PrivateRoute path={service.path} component={ServiceListPage}/>
                <PrivateRoute path={news.path} component={NewsListPage}/>
                <PrivateRoute path={customer.path} component={CustomerListPage}/>
                <PrivateRoute path={agency.path} component={AgencyListPage}/>
                <PrivateRoute path={agencyservice.path} component={AgencyServiceListPage}/>
                <PrivateRoute path={onlineStatus.path} component={OnlineStatusListPage}/>
                <PrivateRoute path={voucher.path} component={VoucherListPage}/>
                {/* <PrivateRoute path={service.path} component={ServiceListPageChild}/> */}
                {/* Error Page */}

                <PrivateRoute exact path={forbidden.path} component={Forbidden}/>
                {/* <Route exact path="/error" component={ErrorServer} /> */}
                
                {/* 404 Page */}
                <PublicRoute component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default RootRoute;
