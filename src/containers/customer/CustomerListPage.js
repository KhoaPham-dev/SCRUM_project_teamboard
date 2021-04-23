import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ListBasePage from "../ListBasePage";
import CustomerForm from "../../compoments/customer/CustomerForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { convertStringToDateTimeString } from "../../utils/datetimeHelper";
import { AppConstants } from "../../constants";

const commonStatus = [
  { value: 1, label: 'Active', color: 'green' },
  { value: 0, label: 'Unactive', color: 'red' },
]

class CustomerListPage extends ListBasePage {
  initialSearch() {
    return { fullName: "", phone: "" , status: undefined };
  }

  constructor(props) {
    super(props);
    this.objectName = "customer";
    this.breadcrumbs = [{ name: "Customer" }];
    this.columns = [
      this.renderIdColumn(),
      {
        title: "Avatar",
        dataIndex: "avatarPath",
        render: (avatarPath) => (
          <Avatar
            style={{width: "70px", height: "70px", padding: "8px"}}
            className="customer-avatar"
            size="large"
            icon={<UserOutlined />}
            src={avatarPath ? `${AppConstants.contentRootUrl}${avatarPath}` : null}
          />
        ),
      },
      { title: "User Name", dataIndex: "username" },
      { title: "Full Name", dataIndex: "fullName" },
      { title: "Phone Number", dataIndex: "phone" },
      { title: "E-mail", dataIndex: "email", width: "200px" },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        render: (createdDate) => convertStringToDateTimeString(createdDate),
      },
      {
        title: "Province",
        dataIndex: "provinceDto",
        render: (province) => province.provinceName,
      },
      this.renderStatusColumn(),
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
        key: "fullName",
        seachPlaceholder: "Full Name",
        initialValue: this.search.fullName,
      },
      {
        key: "phone",
        seachPlaceholder: "Phone",
        initialValue: this.search.phone,
      },
      {
        key: "status",
        seachPlaceholder: "Select Status",
        fieldType: FieldTypes.SELECT,
        options: commonStatus,
        initialValue: this.search.status,
      },
    ];
  }

  renderStatusColumn() {
    return {
        title: 'Status',
        dataIndex: 'status',
        width: '100px',
        render: (status) => {
          const statusItem = commonStatus.find(s=>s.value === status);
          return (
            <Tag className="tag-status" color={statusItem.color}>
                {statusItem.label}
            </Tag>
          )
        }
    }
  }

  render() {
    const {
      dataList,
      loading,
      uploadFile,
      getProvinceCombobox,
      provinceCombobox,
      districtCombobox,
      wardCombobox,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const customer = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={customer}
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
          <CustomerForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? this.dataDetail : {}}
            uploadFile={uploadFile}
            getProvinceCombobox={getProvinceCombobox}
            provinceCombobox={provinceCombobox}
            districtCombobox={districtCombobox}
            wardCombobox={wardCombobox}
            commonStatus={commonStatus}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.customer.tbCustomerLoading,
  dataList: state.customer.customerData || {},
  provinceCombobox: state.province.provinceCombobox || [],
  districtCombobox: state.province.districtCombobox || [],
  wardCombobox: state.province.wardCombobox || []
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getCustomerList(payload)),
  getDataById: (payload) => dispatch(actions.getCustomerById(payload)),
  updateData: (payload) => dispatch(actions.updateCustomer(payload)),
  deleteData: (payload) => dispatch(actions.deleteCustomer(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
  getProvinceCombobox: (payload) => dispatch(actions.getProvinceCombobox(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListPage);
