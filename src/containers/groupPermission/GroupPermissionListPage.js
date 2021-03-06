import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ListBasePage from "../ListBasePage";
import GroupPermissionForm from "../../compoments/groupPermission/GroupPermissionForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";

class GroupPermissionListPage extends ListBasePage {
  initialSearch() {
    return {name: ""};
  }

  constructor(props) {
    super(props);
    this.objectName = "groups";
    this.breadcrumbs = [{ name: "Group Permission" }];
    this.columns = [
      this.renderIdColumn(),
      { title: "Name", dataIndex: "name" },
      { title: "Description", dataIndex: "description", width: "200px" },
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: false,
      isChangeStatus: false,
    };
  }

  getSearchFields() {
    return [
      {
        key: "name",
        seachPlaceholder: "Name",
        initialValue: this.search.group,
      },
    ];
  }

  getDataDetailMapping(data) {
    return {
        ...data,
        permissions: data.permissions.map(permission => permission.id)
    }
  }

  render() {
    const {
      dataList,
      loading,
      permissions,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const groupPermissions = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    const permissionsList = permissions.data || [];

    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
        {
          this.renderCreateNewButton((
            <Button
            type="primary"
            onClick={() => this.onShowModifiedModal(false)}
          >
            <PlusOutlined /> New Group Permission
          </Button>
          ))
        }
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={groupPermissions}
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
          <GroupPermissionForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? this.dataDetail : {}}
            permissions={permissionsList || []}
            getPermissionList={this.props.getPermissionList}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.groupPermission.tbGroupPermissionLoading,
  dataList: state.groupPermission.groupPermissionData || {},
  permissions: state.groupPermission.permissions || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getGroupPermissionList(payload)),
  getDataById: (payload) => dispatch(actions.getGroupPermissionById(payload)),
  createData: (payload) => dispatch(actions.createGroupPermission(payload)),
  updateData: (payload) => dispatch(actions.updateGroupPermission(payload)),
  getPermissionList: (payload) => dispatch(actions.getPermissionList(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPermissionListPage);
