import React from 'react';
import { connect } from 'react-redux';
import { Button, Avatar } from 'antd';
import { PlusOutlined, UserOutlined,} from '@ant-design/icons';

import ListBasePage from '../ListBasePage';
// import AdminForm from '../../compoments/user/AdminForm';
import OrganizeForm from '../../compoments/organize/OrganizeForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { commonStatus } from '../../constants/masterData';
import { AppConstants,} from '../../constants';

class OrganizeListPage extends ListBasePage {

    initialSearch() {
        return { name: "", status: undefined};
    }

    constructor(props) {
        super(props);
        this.objectName = 'organize';
        this.breadcrumbs = [{name: 'Organize'}];
        this.columns = [
            this.renderIdColumn(),
            { 
                title: 'Logo', 
                dataIndex: 'organizeLogo',
                render : (logo) => (
                <Avatar size="large" icon={<UserOutlined />} 
                src={logo ? `${AppConstants.contentRootUrl}${logo}` : null}/>
                ),
                width: "100px",
            },
            { title: 'Name', dataIndex: 'organizeName' },
            { title: 'Address', dataIndex: 'organizeAddress' },
            { title: 'Description', dataIndex: 'organizeDescription'},
            this.renderStatusColumn(),
            this.renderActionColumn()
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
            isChangeStatus: false
        }
    }

    getSearchFields() {
        return [
            { key: "name", seachPlaceholder: 'Organize Name', initialValue: this.search.name },
            {
                key: "status",
                seachPlaceholder: "Select Status",
                fieldType: FieldTypes.SELECT,
                options: commonStatus,
                initialValue: this.search.status,
            },
        ];
    }

    prepareCreateData(values) {
        return {
            ...values
        };
    }

    prepareUpdateData(values) {
        return {
            id: this.dataDetail.id,
            ...values
        };
    }

    getDataDetailMapping(data) {
        return {
            ...data,
        }
    }

    render() {
        const { dataList, loading, uploadFile } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        const organize = dataList.data || [];
        this.pagination.total = dataList.totalElements || 0;

        return (
            <div>
                {this.renderSearchForm()}
                <div className="action-bar">    
                    {
                        this.renderCreateNewButton((
                            <Button type="primary" onClick={() => this.onShowModifiedModal(false)}>
                            <PlusOutlined /> New Organize
                            </Button>
                        ))
                    }
                </div>
                <BaseTable
                    loading={loading}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={organize}
                    pagination={this.pagination}
                    onChange={this.handleTableChange}
                />
                <BasicModal
                    visible={isShowModifiedModal}
                    isEditing={this.isEditing}
                    objectName={this.objectName}
                    loading={isShowModifiedLoading}
                    onOk={this.onOkModal}
                    onCancel={this.onCancelModal}
                    >
                        <OrganizeForm
                            isEditing={this.isEditing}
                            dataDetail={this.isEditing ? this.dataDetail : {}}
                            uploadFile={uploadFile}
                        />
                </BasicModal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading:state.organize.organizeListLoading,
    dataList: state.organize.organizeListData || {},
})

const mapDispatchToProps = dispatch => ({
    getDataList: (payload) => dispatch(actions.getOrganizeList(payload)),
    getDataById: (payload) => dispatch(actions.getOrganize(payload)),
    createData: (payload) => dispatch(actions.createOrganize(payload)),
    updateData: (payload) => dispatch(actions.updateOrganize(payload)),
    deleteData: (payload) => dispatch(actions.deleteOrganize(payload)),
    uploadFile: (payload) => dispatch(actions.uploadFile(payload)),

})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizeListPage);