import React from 'react';
import { connect } from 'react-redux';
import { Button, Avatar} from 'antd';
import { PlusOutlined,UserOutlined } from '@ant-design/icons';

import ListBasePage from '../ListBasePage';
import ServiceForm from '../../compoments/service/ServiceForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { commonStatus } from '../../constants/masterData';
import ServiceListPageChild from '../../containers/service/ServiceListPageChild';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import { AppConstants,} from '../../constants';
class ServiceListPage extends ListBasePage {
    initialSearch() {
        return { name: "", status: undefined, categoryId: undefined};
    }
    
    constructor(props) {
        
        super(props);
        // this.state={parent:{}};
        this.objectName = 'service';
        this.breadcrumbs = [{name: 'Service'}];
        this.columns = [
            this.renderIdColumn(),
            // {
            //     title: 'Name', 
            //     render: (dataRow) => {
            //         return (
            //             <a onClick={()=>{
            //                 this.renderRouting(dataRow.id);
            //             }}>
            //                 {dataRow.serviceName}
            //             </a>
            //         )
            //     }
            // },
            { 
                title: 'Logo', 
                dataIndex: 'serviceImageUrl',
                render : (logo) => (
                <Avatar shape="square" size="large" icon={<UserOutlined />} 
                src={logo ? `${AppConstants.contentRootUrl}${logo}` : null}/>
                ),
                width: "100px",
            },
            { title: 'Name', dataIndex: 'serviceName'},
            this.renderMoneyColumn(),
            this.renderRatioColumn(),
            { title: 'Category Name', dataIndex: 'categoryName'},
            
            this.renderStatusColumn(),
            this.renderActionColumn()
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
            isChangeStatus: false
        }
    }

    getCategoryList=() =>
    {
        const {comboboxList} = this.props;
        let categorylist=[];
        if (comboboxList && comboboxList.data)
            for (let i = 0; i <comboboxList.data.length;i++)
            {
                //categorylist[i].value=comboboxList.data[i].categoryId
                //categorylist[i].label=comboboxList.data[i].categoryName
                categorylist.push({value: comboboxList.data[i].categoryId, label: comboboxList.data[i].categoryName})
                // categorylist = ()=>
                // {
                //     categorylist.push({value: comboboxList.data[i].categoryId, label: comboboxList.data[i].categoryName})
                // }
            }
        return categorylist;
    }
    getSearchFields() {
        const comboboxList=this.getCategoryList();
        return [
            { key: "name", seachPlaceholder: 'Service Name', initialValue: this.search.name },
            {
                key: "status",
                seachPlaceholder: "Select Status",
                fieldType: FieldTypes.SELECT,
                options: commonStatus,
                initialValue: this.search.status,
            },
            //{ key: "name", seachPlaceholder: 'Service Name', initialValue: this.search.name },
            {
                key: "categoryId",
                seachPlaceholder: "Select Category",
                fieldType: FieldTypes.SELECT,
                options: comboboxList,
                initialValue: this.search.categoryId,
            },
        ];
    }

    prepareCreateData(values) {
        return {
            ...values,
            //parentId: this.ParentID,
        };
    }

    prepareUpdateData(data) {
        return {
            ...data,
            id: this.dataDetail.id,
            serviceId: this.dataDetail.id,
        };
    }

    getDataDetailMapping(data) {
        return {
            ...data,
        }
    }

    renderRouting (id){
        this.setState(()=>this.parent=id);
        this.props.history.push(`service/${id}`);
        return () =>
        <Router>
            <Route path={`service/${id}`} component={ServiceListPageChild}/>
        </Router>
    
    }

    componentWillMount() {
        this.loadDataTable(this.props);
        this.props.getComboboxList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.search !== this.props.location.search) {
            this.loadDataTable(nextProps);
        }
    }

    formatMoney(value, setting = {}){
        if((value || value === 0) && !isNaN(value)) {
            const groupSeparator = setting.groupSeparator || ',';
            const decimalSeparator = setting.decimalSeparator || ',';
            //const currentcy = setting.currentcy;
            //const currentcyPosition = setting.currentcyPosition || CurrentcyPositions.BACK;
            //value = value.toFixed(2);
            const decimalPosition = value.toString().indexOf('.');
            if(decimalPosition > 0) {
                const intVal = value.toString().substring(0, decimalPosition);
                const decimalVal = value.toString().substring(decimalPosition + 1);
                value = `${intVal.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)}${decimalSeparator}${decimalVal}`;
            }
            else {
                value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
            }
            return `${value}`;
        }
        return '';
    }
    formatRatio(value, setting = {}){
        if((value || value === 0) && !isNaN(value)) {
            const groupSeparator = setting.groupSeparator || '.';
            const decimalSeparator = setting.decimalSeparator || '.';
            const currentcy = setting.currentcy || '%';
            //const currentcy = setting.currentcy;
            //const currentcyPosition = setting.currentcyPosition || CurrentcyPositions.BACK;
            const decimalPosition = value.toString().indexOf('.');
            if(decimalPosition > 0) {
                const intVal = value.toString().substring(0, decimalPosition);
                const decimalVal = value.toString().substring(decimalPosition + 1);
                value = `${intVal.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)}${decimalSeparator}${decimalVal}`;
            }
            else {
                value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
            }
            return `${value}${currentcy}`;
        }
        return '';
    }
    renderMoneyColumn() {
        return {
            title: 'Price', dataIndex: 'servicePrice',
            render: (servicePrice) => this.formatMoney(servicePrice)
        }
    }

    renderRatioColumn() {
        return {
            title: 'Ratio', dataIndex: 'serviceRatioShare',
            render: (serviceRatioShare) => this.formatRatio(serviceRatioShare)
        }
    }
    
    render() {
        const { dataList, loading, uploadFile} = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        this.pagination.total = dataList.totalElements || 0;
        const service = dataList.data || [];
        return (
            <div>
                {this.renderSearchForm()}
                <div className="action-bar">    
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
                    //ComboboxList = {this.props.getComboboxList}
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
                            //dataDetail={this.isEditing ? {...this.dataDetail, parentId: dataList.parentId} : { parentId: dataList.parentId}}
                            dataDetail={this.isEditing ?{...this.dataDetail} : {}}
                            // comboboxList={this.props.getComboboxList()} 
                            getComboboxList={this.props.getComboboxList}
                            comboboxList={this.props.comboboxList}
                            uploadFile={uploadFile}
                        />
                </BasicModal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.service.serviceListLoading,
    dataList: state.service.serviceListData || {},
    comboboxLoading: state.service.comboboxListLoading,
    comboboxList: state.service.comboboxListData ||{},
    //parent: state.service.parent,
})

const mapDispatchToProps = dispatch => ({
    getDataList: (payload) => dispatch(actions.getServiceList(payload)),
    getComboboxList: (payload) => dispatch(actions.getComboboxList(payload)),
    getDataById: (payload) => dispatch(actions.getService(payload)),
    createData: (payload) => dispatch(actions.createService(payload)),
    updateData: (payload) => dispatch(actions.updateService(payload)),
    deleteData: (payload) => dispatch(actions.deleteService(payload)),
    uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ServiceListPage);