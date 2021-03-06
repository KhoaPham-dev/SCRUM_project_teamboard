import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ListBasePage from "../ListBasePage";
import SettingForm from "../../compoments/settings/SettingForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";

class SettingsListPage extends ListBasePage {
  initialSearch() {
    return { key: "", group: ""};
  }

  constructor(props) {
    super(props);
    this.objectName = "settings";
    this.breadcrumbs = [{ name: "Settings" }];
    this.columns = [
      this.renderIdColumn(),
      { title: "Name", dataIndex: "name" },
      { title: "Key", dataIndex: "key" },
      { title: "Value", dataIndex: "value" },
      { title: "Description", dataIndex: "description", width: "200px" },
      { title: "Group", dataIndex: "group" },
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
  }

  getSearchFields() {
    return [
      {
        key: "key",
        seachPlaceholder: "Key",
        initialValue: this.search.name,
      },
      {
        key: "group",
        seachPlaceholder: "Group",
        initialValue: this.search.group,
      },
    ];
  }

  prepareCreateData(data) {
    const {description, name, editable, group, key, value} = data;
    return {
        description,  
        name,
        editable,
        settingValue: value,
        settingGroup: group,
        settingKey: key,
    }
  }

    prepareUpdateData(data) {
        const {description, name, group, key, value} = data;
        return {
            description,  
            name,
            settingValue: value,
            settingGroup: group,
            settingKey: key,
            id: this.dataDetail.id
        }
    }


  render() {
    const {
      dataList,
      loading,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const settings = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;

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
              <PlusOutlined /> New Setting
            </Button>
            ))
          }
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={settings}
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
          <SettingForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? this.dataDetail : {}}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.settings.tbSettingsLoading,
  dataList: state.settings.settingsData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getSettingsList(payload)),
  getDataById: (payload) => dispatch(actions.getSettingById(payload)),
  createData: (payload) => dispatch(actions.createSetting(payload)),
  updateData: (payload) => dispatch(actions.updateSetting(payload)),
  deleteData: (payload) => dispatch(actions.deleteSetting(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsListPage);
