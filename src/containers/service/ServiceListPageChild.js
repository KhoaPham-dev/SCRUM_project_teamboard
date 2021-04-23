import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PlusOutlined,} from '@ant-design/icons';

import ListBasePage from '../ListBasePage';
// import AdminForm from '../../compoments/user/AdminForm';
import ServiceForm from '../../compoments/service/ServiceForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { commonStatus } from '../../constants/masterData';
import KindTag from '../../compoments/common/elements/KindTag';
// import ServiceListPageChild from '../../containers/service/ServiceListPageChild';

class ServiceListPageChild extends ListBasePage {
    initialSearch() {
        return { name: "", status: undefined};
    }

    constructor(props) {
        super(props);
        this.objectName = 'service';
        this.breadcrumbs = [{name: 'Service'}];
        this.columns = [
            this.renderIdColumn(),
            {title: 'Name', dataIndex: 'serviceName'},
            { title: 'Description', dataIndex: 'description'},
            this.renderKindColumn(),
            { title: 'Ordering', dataIndex: 'ordering'},
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
            { key: "name", seachPlaceholder: 'Service Name', initialValue: this.search.name },
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
            ...values,
            // kind:ParentKind
            //parentId: this.ParentID,
        };
    }
    
    prepareUpdateData(data) {
        return {
            ...data,
            //id: this.dataDetail.id,
            serviceId: this.dataDetail.id,
        };
    }

    getDataDetailMapping(data) {
        return {
            ...data,
        }
    }

    renderKindColumn() {
        return {
            title: 'Kind',
            dataIndex: 'kind',
            width: '100px',
            render: (kind) => <KindTag kind={kind}/>
        }
    }

    render() {
        const { dataList, loading } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        this.pagination.total = dataList.totalElements || 0;

        const ParentId = Number(window.location.pathname.split("/")[2]);
        let ParentName = null;
        let ParentKind = null;
        let service = [];
        let j = 0;
        let thisstatussearch = (this.search.status);
        
        if (thisstatussearch !==undefined)
        {
            // for (let i = 0; i <dataList.totalElements;i++)
            //     if (dataList.data[i] && dataList.data[i].parentId && dataList.data[i].parentId=== ParentId&&dataList.data[i].status ===Number(thisstatussearch))
            //         service[j++] = dataList.data[i];
            for (let i = 0; i <dataList.totalElements;i++)
                if (dataList.data[i])
                {
                    if (dataList.data[i].id === ParentId) 
                    {
                        ParentName =dataList.data[i].serviceName;
                        ParentKind = dataList.data[i].kind;
                    }
                    if (dataList.data[i].parentId && dataList.data[i].parentId=== ParentId && dataList.data[i].status === Number(thisstatussearch))
                    {
                        //dataList.data[i].kind = ParentKind;
                        // if ()
                        service[j++] = dataList.data[i];
                    }
                }
        }
        else{
            // for (let i = 0; i <dataList.totalElements;i++)
            //     if (dataList.data[i] && dataList.data[i].parentId && dataList.data[i].parentId=== ParentId)
            //         service[j++] = dataList.data[i];
            for (let i = 0; i <dataList.totalElements;i++)
                if (dataList.data[i])
                {
                    if (dataList.data[i].id === ParentId) 
                        {
                            ParentName =dataList.data[i].serviceName;
                            ParentKind = dataList.data[i].kind;
                        }
                    if (dataList.data[i].parentId && dataList.data[i].parentId=== ParentId)
                    {
                            //dataList.data[i].kind = ParentKind;
                        service[j++] = dataList.data[i];
                    }
                }
        }
        
        return (
            <div>
                {this.renderSearchForm()}
                <div className="action-bar service">   
                    <span style={{color: "#40a9ff"}}>
                        {ParentName} {<span style={{margin: "0 5px", color: 'black'}}>></span>}
                    </span> 
                    {
                        this.renderCreateNewButton((
                            <Button type="primary" onClick={() => this.onShowModifiedModal(false)}>
                            <PlusOutlined /> New Service
                            </Button>
                        ))
                    }
                </div>
                <BaseTable
                    loading={loading}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={service}
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
                        <ServiceForm
                            isEditing={this.isEditing}
                            dataDetail={this.isEditing ? {...this.dataDetail, parentId: ParentId, kind: ParentKind } : {parentId: ParentId, kind: ParentKind}}              
                        />
                </BasicModal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.service.serviceListLoading,
    dataList: state.service.serviceListData || {},
    parent: state.service.parent,
    // path: state.service.path
})

const mapDispatchToProps = dispatch => ({
    getDataList: (payload) => dispatch(actions.getServiceList(payload)),
    getDataById: (payload) => dispatch(actions.getService(payload)),
    createData: (payload) => dispatch(actions.createService(payload)),
    updateData: (payload) => dispatch(actions.updateService(payload)),
    deleteData: (payload) => dispatch(actions.deleteService(payload)),

})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceListPageChild);