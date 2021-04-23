import React from 'react';
import { connect } from 'react-redux';
import { Button, Avatar, Divider} from 'antd';
import { PlusOutlined,UserOutlined,EditOutlined,DeleteOutlined,LockOutlined,CustomerServiceOutlined,CheckOutlined } from '@ant-design/icons';
import ListBasePage from '../ListBasePage';
import AgencyForm from '../../compoments/agency/AgencyForm.js';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { commonStatus } from '../../constants/masterData';
import { actions } from '../../actions';
import { AppConstants,STATUS_ACTIVE} from '../../constants';
import {convertDateTimeToString,convertStringToDateTime, } from '../../utils/datetimeHelper';
import { FieldTypes } from '../../constants/formConfig';
import AgencyServiceListPage from './AgencyServiceListPage';
import ElementWithPermission from '../../compoments/common/elements/ElementWithPermission';
import { sitePathConfig } from '../../constants/sitePathConfig';

class AgencyListPage extends ListBasePage {
    initialSearch() {
        return { fullName: "", status: undefined, phone: undefined};
    }
    
    constructor(props) {
        super(props);
        this.objectName = 'agency';
        this.breadcrumbs = [{name: 'Agency'}];
        this.columns = [
            this.renderIdColumn(),         
            { 
                title: 'Avatar', 
                dataIndex: 'avatarPath',
                render : (logo) => (
                <Avatar size="large" icon={<UserOutlined />} 
                src={logo ? `${AppConstants.contentRootUrl}${logo}` : null}/>
                ),
                width: "100px",
            },
            { title: 'Full Name', dataIndex: 'fullName'},
            { title: 'Phone', dataIndex: 'phone'},
            { title: 'Birthday', dataIndex: 'birthday', render: (birthday) => birthday.split(' ')[0]},
            { title: 'Province', dataIndex: 'provinceDto', render: (provinceDto) => provinceDto.provinceName},
            this.renderStatusColumn(),
            this.renderActionColumn()
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
            isChangeStatus: false,
            isRouting: true,
        }
        // this.props.getProvinceComboboxList();

        // this.provinceCombobox=[];
    }

    prepareCreateData(values) {
        return {
            ...values,
            id: this.dataDetail.id,
            birthday: `${convertDateTimeToString(values.birthday)} 00:00:00`,
            dateOfIssue: `${convertDateTimeToString(values.dateOfIssue)} 00:00:00`,
        };
    }

    prepareUpdateData(data) {
        return {
            ...data,
            id: this.dataDetail.id,
            birthday: `${convertDateTimeToString(data.birthday)} 00:00:00`,
            dateOfIssue: `${convertDateTimeToString(data.dateOfIssue)} 00:00:00`,
        };
    }

    getDataDetailMapping(data) {
        return {
            ...data,
            birthday: convertStringToDateTime(data.birthday),
            dateOfIssue: convertStringToDateTime(data.dateOfIssue),
            provinceId: data.provinceDto.provinceId,
            districtId: data.districtDto.provinceId,
            communeId: data.communeDto.provinceId,
            agencyId: this.dataDetail.id,
        }
    }
    getSearchFields() {
        return [
            { key: "fullName", seachPlaceholder: 'Full Name', initialValue: this.search.fullName },
            {
                key: "status",
                seachPlaceholder: "Select Status",
                fieldType: FieldTypes.SELECT,
                options: commonStatus,
                initialValue: this.search.status,
            },
            { key: "phone", seachPlaceholder: 'Phone', initialValue: this.search.phone },
        ];
    }
    renderRouting (id,name){
        this.props.history.push(`agencyservice?idAgency=${id}&agencyName=${name}`);
        
        return () =>
        <Router>
            <Route path={`agencyservice/`} component={AgencyServiceListPage}/>
        </Router>
    
    }

    renderRoutingServiceButton(children){
        const { location : { pathname }} = this.props;
        const requiredPermissions = [];
        Object.keys(sitePathConfig) && Object.keys(sitePathConfig).forEach(key=>{
            if(sitePathConfig[key].path === pathname)
            {
                requiredPermissions.push(sitePathConfig[key].permissions[5]) //List agency-servicelist
                requiredPermissions.push(sitePathConfig[key].permissions[6]) //List servicelist
            }
        })
        return (<ElementWithPermission permissions={requiredPermissions}>
            {children}
        </ElementWithPermission>)
    }
    renderEditButton(children){
        const { location : { pathname }} = this.props;
        const requiredPermissions = [];
        Object.keys(sitePathConfig) && Object.keys(sitePathConfig).forEach(key=>{
            if(sitePathConfig[key].path === pathname && pathname.indexOf(sitePathConfig[key].path) === 7){
                requiredPermissions.push(sitePathConfig[key].permissions[3]) //Update
                // requiredPermissions.push(sitePathConfig[key].permissions[7]) //Get province
            }
        })
        return (<ElementWithPermission permissions={requiredPermissions}>
            {children}
        </ElementWithPermission>)
    }

    renderCreateNewButton(children){
        const { location : { pathname }} = this.props;
        const requiredPermissions = [];
        Object.keys(sitePathConfig) && Object.keys(sitePathConfig).forEach(key=>{
            if(sitePathConfig[key].path === pathname && pathname.indexOf(sitePathConfig[key].path) === 7){
                requiredPermissions.push(sitePathConfig[key].permissions[2]) //Create
                // requiredPermissions.push(sitePathConfig[key].permissions[7]) //Get province
            }
        })
        return (<ElementWithPermission permissions={requiredPermissions}>
            {children}
        </ElementWithPermission>)
    }
    renderActionColumn() {
        return {
            title: 'Action',
            width: '100px',
            render: (dataRow) => {
                const actionColumns = [];
                if(this.actionColumns.isRouting) {
                    actionColumns.push(this.renderRoutingServiceButton((
                        <Button type="link" onClick={() =>this.renderRouting(dataRow.id, dataRow.fullName)} className="no-padding">
                            <CustomerServiceOutlined />
                        </Button>
                    ))
                    )
                }
                if(this.actionColumns.isEdit) {
                actionColumns.push(this.renderEditButton((
                    <Button type="link" onClick={() => this.getDetail(dataRow.id)} className="no-padding">
                        <EditOutlined/>
                    </Button>
                )))
                }
                if(this.actionColumns.isChangeStatus) {
                    actionColumns.push(
                        <Button type="link" onClick={() => this.showChangeStatusConfirm(dataRow) } className="no-padding">
                            {
                                dataRow.status === STATUS_ACTIVE
                                ?
                                <LockOutlined/>
                                :
                                <CheckOutlined/>
                            }
                        </Button>
                    )
                }
                if(this.actionColumns.isDelete) {
                    actionColumns.push(
                        this.renderDeleteButton((
                            <Button type="link" onClick={() => this.showDeleteConfirm(dataRow.id) } className="no-padding">
                                <DeleteOutlined/>
                            </Button>
                        ))
                    )
                }
                const actionColumnsWithDivider = [];
                actionColumns.forEach((action, index) => {
                    actionColumnsWithDivider.push(action);
                    if(index !== (actionColumns.length -1))
                    {
                        actionColumnsWithDivider.push(<Divider type="vertical" />);
                    }
                })
                return (
                    <span>
                        {
                            actionColumnsWithDivider.map((action, index) => <span key={index}>{action}</span>)
                        }
                    </span>
                )
            }
        }  
    }
    render() {
        const { dataList, loading, uploadFile, provinceloading,} = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        this.pagination.total = dataList.totalElements || 0;
        const agency = dataList.data || [];
        return (
            <div>
                {this.renderSearchForm()}
                <div className="action-bar">    
                    {
                        this.renderCreateNewButton((
                            <Button type="primary" onClick={() => this.onShowModifiedModal(false)}>
                            <PlusOutlined /> New Agency
                            </Button>
                        ))
                    }
                </div>
                <BaseTable
                    loading={loading}
                    
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={agency}
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
                        <AgencyForm
                            isEditing={this.isEditing}
                            dataDetail={this.isEditing ?{...this.dataDetail, } : {}}
                            provinceComboboxList={this.props.provinceComboboxList}
                            districtComboboxList={this.props.districtComboboxList}
                            wardComboboxList={this.props.wardComboboxList}
                            uploadFile={uploadFile}
                            loading={provinceloading}
                            getProvinceComboboxList={this.props.getProvinceComboboxList}
                            getDistrictComboboxList={this.props.getDistrictComboboxList}
                            getWardComboboxList={this.props.getWardComboboxList}
                        />
                </BasicModal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.agency.agencyListLoading,
    dataList: state.agency.agencyListData || {},
    provinceComboboxList: state.agency.provinceComboboxList || {},
    provinceloading: state.agency.provincecomboboxListLoading,

    districtComboboxList: state.agency.districtComboboxList || {},
    districtloading: state.agency.districtcomboboxListLoading,

    wardComboboxList: state.agency.wardComboboxList || {},
    wardloading: state.agency.wardcomboboxListLoading,

    serviceList: state.agency.serviceList,
    serviceListLoading: state.agency.serviceListLoading,
})

const mapDispatchToProps = dispatch => ({
    getDataList: (payload) => dispatch(actions.getAgencyList(payload)),
    getProvinceComboboxList: (payload) => dispatch(actions.getProvinceComboboxList(payload)),
    getDistrictComboboxList: (payload) => dispatch(actions.getDistrictComboboxList(payload)),
    getWardComboboxList: (payload) => dispatch(actions.getWardComboboxList(payload)),
    getDataById: (payload) => dispatch(actions.getAgency(payload)),
    createData: (payload) => dispatch(actions.createAgency(payload)),
    updateData: (payload) => dispatch(actions.updateAgency(payload)),
    deleteData: (payload) => dispatch(actions.deleteAgency(payload)),
    uploadFile: (payload) => dispatch(actions.uploadFile(payload)),

    getServiceList1: (payload) => dispatch(actions.getServiceList1(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AgencyListPage);