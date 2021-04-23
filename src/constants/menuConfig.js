import React from 'react';

import { ApartmentOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined, ControlOutlined, CustomerServiceOutlined, FileTextOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { sitePathConfig } from '../constants/sitePathConfig';

const navMenuConfig = [
    // {
    //     label: 'Account Management',
    //     icon: <UsergroupAddOutlined />,
    //     children: [
    //         {
    //             label: 'Admin',
    //             ...sitePathConfig.admin
    //         },
    //         // {
    //         //     label: 'Shop Account',
    //         //     ...sitePathConfig.shopAccount
    //         // },
    //         // {
    //         //     label: 'Customer',
    //         //     ...sitePathConfig.customer
    //         // },
    //     ]
    // },
    // {
    //     label: 'Organize',
    //     icon: <ApartmentOutlined />,
    //     children: [
    //         {
    //             label: 'Organizate Management',
    //             ...sitePathConfig.organization
    //         }
    //     ]

    // },
    // {
    //     label: 'System',
    //     icon: <ControlOutlined />,
    //     children: [
    //         {
    //             label: 'Setting',
    //             ...sitePathConfig.setting
    //         },
    //         {
    //             label: 'Role',
    //             ...sitePathConfig.groupPermission
    //         },
    //         {
    //             label: 'Province',
    //             ...sitePathConfig.province
    //         },
    //         {
    //             label: 'Category',
    //             ...sitePathConfig.category
    //         },
    //     ]
    // },
    // {
    //     label: 'Service',
    //     icon: <CustomerServiceOutlined />,
    //     children: [
    //         {
    //             label: 'Service',
    //             ...sitePathConfig.service
    //         },
    //         {
    //             label: 'Voucher',
    //             ...sitePathConfig.voucher
    //         },
    //     ]
    // },
    // {
    //     label: 'News',
    //     icon: <FileTextOutlined />,
    //     children: [
    //         {
    //             label: 'News',
    //             ...sitePathConfig.news
    //         },
    //     ]
    // },
    // {
    //     label: 'Customer',
    //     icon: <UserOutlined />,
    //     children: [
    //         {
    //             label: 'Customer',
    //             ...sitePathConfig.customer
    //         },
    //     ]
    // },
    {
        label: 'TeamBoard',
        icon: <TeamOutlined />,
        children: [
            {
                label: 'TeamBoard',
            }
        ]
    },
]

export { navMenuConfig };
