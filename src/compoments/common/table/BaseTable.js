import React from 'react';
import { Table } from 'antd';

const BaseTable = (props) => (
    <Table
        className="base-table"
        size="middle"
        scroll={{ x: false }}
        // scroll={{ x: 'max-content' }}
        {...props}
    />
)

export default BaseTable;