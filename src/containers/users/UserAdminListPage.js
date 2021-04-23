import React from "react";
import { connect } from "react-redux";
import { Button, Avatar, Tag } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

import ListBasePage from "../ListBasePage";
import AdminForm from "../../compoments/user/AdminForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { commonStatus, config } from "../../constants/masterData";
import { convertStringToDateTimeString } from "../../utils/datetimeHelper";
import { AppConstants, UserTypes, GroupPermissonTypes } from "../../constants";
import StatusTag from '../../compoments/common/elements/StatusTag';
import firebase from "firebase/app";

import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";
class UserAdminListPage extends ListBasePage {
  initialSearch() {
    return { username: "", fullName: "", status: undefined, organizeId: "" };
  }

  constructor(props) {
    super(props);
    this.objectName = "tasks";
    this.breadcrumbs = [{ name: "Tasks" }];
    this.columns = [
      // this.renderIdColumn(),
      this.renderDoColumn("Do", 1),
      this.renderDoColumn("Doing", 2),
      this.renderDoColumn("Test", 3),
      this.renderDoColumn("Done", 4),
      
      // { title: "Doing", dataIndex: "fullName" },
      // { title: "Test", dataIndex: "phone" },
      // { title: "Done", dataIndex: "email", width: "200px" },
      // this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
    };
    this.getOrganizeList();
    this.organizeList = [];
    this.lenOfData = 0;
  }


  getSearchFields() {
    return [
      {
        key: "username",
        seachPlaceholder: "Username",
        // initialValue: this.search.username,
      },
      {
        key: "fullName",
        seachPlaceholder: "Full Name",
        // initialValue: this.search.fullName,
      },
      {
        key: "status",
        seachPlaceholder: "Select Status",
        fieldType: FieldTypes.SELECT,
        options: commonStatus,
        initialValue: this.search.status,
      },
      {
        key: "organizeId",
        seachPlaceholder: "Select Organization",
        fieldType: FieldTypes.SELECT,
        options: this.organizeList,
        initialValue: this.search.organizeId,
      },
    ];
  }

  prepareCreateData(values) {
    return {
      kind: UserTypes.ADMIN,
      ...values,
    };
  }
  onDelete(id) {
    const { deleteData } = this.props;
    if(id||id===0) {
        deleteData({
            params: { id },
            onCompleted: this.onDeleteCompleted,
            onError: this.onDeleteError
        });
        firebase.database().ref(`task/data/data/${id}`).remove();
    }
}

  prepareUpdateData(values) {
    return {
      id: this.dataDetail.id,
      kind: UserTypes.ADMIN,
      ...values,
    };
  }

  getDataDetailMapping(data) {
    return {
      ...data,
      groupId: data.group && data.group.id,
    };
  }

  getOrganizeList = () => {
    const { getOrganizeList } = this.props;
    const page = 0;
    const params = { page, size: 20};
    getOrganizeList({ params });
  }

  getOrganizeOptions(){
    const { organizeList } = this.props;
    const organizeListOptions = organizeList.data && organizeList.data.map(organize=>{
      return {
        value: organize.id,
        label: organize.organizeName,
      }
    })
    return organizeListOptions;
  }
  onOkModal(values) {
    const { createData, updateData } = this.props;
    this.setState({ isShowModifiedLoading: true });
    if(this.isEditing) {
        updateData({
            params: this.prepareUpdateData(values),
            onCompleted: this.onModifyCompleted,
            onError: this.onModifyError
        });
    }
    else {
        createData({
            params: this.prepareCreateData(values),
            onCompleted: this.onModifyCompleted,
            onError: this.onModifyError
        });
    }
}

  render() {
    const {
      dataList,
      roles,
      ddlRoleLoading,
      loading,
      searchGroupPermissionList,
      organizeList,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const users = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    this.organizeList = this.getOrganizeOptions();
    return (
      <div>
        <div className="action-bar">
          {this.renderCreateNewButton((
            <Button
            type="primary"
            onClick={() => this.onShowModifiedModal(false)}
          >
            <PlusOutlined /> New Tasks
          </Button>
          ))}
        </div>
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <FirebaseDatabaseNode
            path="task/"
            orderByKey
            // orderByValue={"created_on"}
          >
            {d =>
              {
                if(d.value && d.value.data.data){
                  this.lenOfData = d.value.data.data.length;
                  if(d.value){
                    let data = Object.keys(d.value.data.data).map(e=>{
                      return d.value.data.data[e];
                    })
                    return (<BaseTable
                      loading={false}
                      columns={this.columns}
                      rowKey={(record) => record.id}
                      dataSource={data}
                      pagination={this.pagination}
                      onChange={this.handleTableChange}
                  />)
                  }
                }
                else{
                  return <BaseTable
                  loading={true}
                  columns={this.columns}
                  rowKey={(record) => record.id}
                  dataSource={[]}
                  pagination={this.pagination}
                  onChange={this.handleTableChange}
              />
                }
 
              } 
              
            }
          </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
        
        <BasicModal
          visible={isShowModifiedModal}
          isEditing={this.isEditing}
          objectName={this.objectName}
          loading={isShowModifiedLoading}
          onOk={this.onOkModal}
          onCancel={this.onCancelModal}
        >
          <AdminForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? this.currentEditing : {}}
            searchGroupPermissionList={searchGroupPermissionList}
            roles={roles}
            ddlRoleLoading={ddlRoleLoading}
            kind={GroupPermissonTypes.ADMIN}
            getOrganizeList={this.getOrganizeList}
            organizeList={organizeList}
            lenOfData={this.lenOfData}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.tbUserAdminLoading,
  ddlRoleLoading: state.groupPermission.searchGroupPermissionLoading,
  roles: state.groupPermission.groupPermissions || [],
  dataList: state.user.userAdminData || {},
  organizeList: state.organize.organizeListData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getUserAdminList(payload)),
  searchGroupPermissionList: (payload) =>
    dispatch(actions.searchGroupPermission(payload)),
  getDataById: (payload) => dispatch(actions.getUserById(payload)),
  createData: (payload) => dispatch(actions.createUser(payload)),
  updateData: (payload) => dispatch(actions.updateUser(payload)),
  deleteData: (payload) => dispatch(actions.deleteAdmin(payload)),
  getOrganizeList: (payload) => dispatch(actions.getOrganizeList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminListPage);
