import React from 'react';
import { connect } from 'react-redux';
import { Button,  Divider,} from 'antd';
import { PlusOutlined,
    DeleteOutlined,
 } from '@ant-design/icons';

import ListBasePage from '../ListBasePage';
import AgencyServiceForm from '../../compoments/agency/AgencyServiceForm.js';

import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal2';
import BooleanField from "../../compoments/common/entryForm/BooleanField2";
import { actions } from '../../actions';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { showErrorMessage,showSucsessMessage } from "../../services/notifyService";
import AgencyListPage from "./AgencyListPage";
import { sitePathConfig } from '../../constants/sitePathConfig';
const { getUserData } = actions;
class AgencyServiceListPage extends ListBasePage {
    
    constructor(props) {
        super(props);
        this.objectName = 'service';
        this.breadcrumbs = [{name: 'Agency'}];
        this.columns = [
            this.renderIdColumn(),
            { title: 'Service', dataIndex: 'serviceName'},
            this.renderStatusColumn(),
            this.renderActionColumn(),
        ];
        this.actionColumns = {
            isDelete: true,
        }
        this.props.getServiceList1();
    }
    renderStatusColumn() {
        return {
            title: 'Status',
            dataIndex: 'status',
            width: '100px',
            margin: '0px',
            marginBottom: '0px',
            render: (status, dataRow) => 
            <BooleanField style={{marginBottom: "0px"}} defaultChecked={status} disabled={this.renderSwitchButton()} onChange={(status)=> this.handleActiveService(dataRow.id, status)}/>
        }
    }
    renderSwitchButton(){
        const { location : { pathname }} = this.props;
        let temp = true;
        Object.keys(sitePathConfig) && Object.keys(sitePathConfig).forEach(key=>{
            if(sitePathConfig[key].path === pathname){
                if(!sitePathConfig[key].permissions || this.userData.permissions.indexOf(sitePathConfig[key].permissions[3])>0)
                temp=false;
            }
        })
        return temp;
    }
    getSearchFields(){
        return [];
    }
    prepareCreateData(values) {
        return {
            ...values,
            id: this.dataDetail.id,
        };
    }

    prepareUpdateData(data) {
        return {
            ...data,
            id: this.dataDetail.id,
        };
    }

    getDataDetailMapping(data) {
        return {
            ...data,
            idAgency: parseInt(this.props.location.search.split("&agencyName=")[0].split("?idAgency=")[1]),
        }
    }
    componentWillMount() {
        this.userData = getUserData();
        if(this.checkPermission())
            this.loadDataTable(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.listServiceByAgency !== this.props.listServiceByAgency) {
            this.setState({listServiceByAgency: nextProps.listServiceByAgency});
        }
    }
    
    getList() {
        const { getDataList } = this.props;
        const params = parseInt(this.props.location.search.split("&agencyName=")[0].split("?idAgency=")[1]);
        getDataList({ params });
    }
    getTitle() {
        const { hiddenTile, title, isEditing, objectName } = this.props;
        if(hiddenTile)
            return null;
        else if(title) {
            return title;
        }
        const name = objectName || '';
        return isEditing ? `UPDATE SERVICES ${name.toUpperCase()}` : `ADD SERVICES ${name.toUpperCase()}`;
    }

    handleActiveService(id,status) {
        const { activeService, } = this.props;
        if(status===true) status = 1;
            else status = 0;
        const params = { id,status };
        activeService({
            params,
            onCompleted: ({data}) => {
                this.dataDetail = this.getDataDetailMapping(data);
                showSucsessMessage(`Active ${this.objectName} successful!`);
            },
            onError: (err) => {
                if(err && err.message)
                    showErrorMessage(err.message);
                else
                    showErrorMessage(`${this.getActionName()} ${this.objectName} failed. Please try again!`);
            }
        });
    }
    renderActionColumn() {
        return {
            title: 'Action',
            width: '100px',
            align: 'center',
            render: (dataRow) => {
                const actionColumns = [];
                if(this.actionColumns.isDelete) {
                    actionColumns.push(
                        this.renderDeleteButton((
                        <Button type="link" onClick={() => this.showDeleteConfirm(dataRow.id) } className="no-padding" style={{textAlign:'center'}}>
                            <DeleteOutlined/>
                        </Button>
                    )))
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

    onShowModifiedModal(isEditing) {
        this.isEditing = isEditing;
        this.setState({ isShowModifiedModal: true });
    }
    renderRouting (){
        this.props.history.push("agency");
        return () =>
        <Router>
            <Route path={"agency"} component={AgencyListPage}/>
        </Router>
    }
    checkPermission(){
        const { location: { pathname } } = this.props;
        return !!Object.keys(sitePathConfig).find(key => {
            if(sitePathConfig[key].path === pathname || pathname.indexOf(sitePathConfig[key].path) === 0) {
                if(sitePathConfig[key].permissions && this.userData.permissions.indexOf(sitePathConfig[key].permissions[0]) < 0) {
                    return false;
                }
                else return true;
            }
            return false;
        });
    }
    render() {
        const { serviceList, listServiceByAgency} = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        const agency = listServiceByAgency.data || [];
        return (
        <div>
                <div className="action-bar category">   
                    <span style={{color: "#40a9ff"}}>

                    {<a style={{margin: "0 5px",}} onClick={()=>this.renderRouting()}>Tất cả</a>}
                    {<span style={{margin: "0 5px", color: 'black'}}>></span>}
                    {decodeURI(this.props.location.search.split("agencyName=")[1])}     {<span style={{margin: "0 5px", color: 'black'}}>></span>}

                    </span> 
                    {
                        this.renderCreateNewButton((
                        <Button type="primary" onClick={() => this.onShowModifiedModal(false)}>
                        <PlusOutlined /> Add Service
                        </Button>
                    ))}
                </div>
                <BaseTable
                    loading={this.props.serviceListLoading}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={agency}
                    onChange={this.handleTableChange}
                />
                <BasicModal
                    visible={isShowModifiedModal}
                    isEditing={this.isEditing}
                    objectName={this.objectName}
                    loading={isShowModifiedLoading}
                    onCancel={this.onCancelModal}
                    title={this.getTitle()}
                    >
                        <AgencyServiceForm
                            isEditing={this.isEditing}
                            dataDetail={this.isEditing ?{...this.dataDetail, } : {}}

                            serviceList={serviceList}

                            agencyId={ parseInt(this.props.location.search.split("&agencyName=")[0].split("?idAgency=")[1])}
                            
                            listServiceByAgency={this.props.listServiceByAgency}
                            getListServiceByAgency={this.props.getDataList}
                            getServiceList1={this.props.getServiceList1}
                            addService={this.props.addService}
                            activeService={this.props.activeService}

                        />
                </BasicModal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.agency.listServiceByAgencyLoading,
    listServiceByAgency: state.agency.listServiceByAgency || {},
    serviceList: state.agency.serviceList || {},
    serviceListLoading: state.agency.serviceListLoading,

})

const mapDispatchToProps = dispatch => ({
    getDataList: (payload) => dispatch(actions.getListServiceByAgency(payload)),
    getServiceList1: (payload) => dispatch(actions.getServiceList1(payload)),
    addService: (payload) => dispatch(actions.addService(payload)),
    activeService: (payload) => dispatch(actions.activeService(payload)),
    deleteData: (payload) => dispatch(actions.deleteService(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AgencyServiceListPage);