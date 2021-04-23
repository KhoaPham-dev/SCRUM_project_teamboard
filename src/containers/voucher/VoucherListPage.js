import React from "react";
import { connect } from "react-redux";
import { Button, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ListBasePage from "../ListBasePage";
import VoucherForm from "../../compoments/voucher/VoucherForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";
import { convertStringToDateTimeString } from "../../utils/datetimeHelper";

import { actions } from "../../actions";

class VoucherListPage extends ListBasePage {
  initialSearch() {
    return { voucherCode: "", voucherSerial: ""};
  }

  constructor(props) {
    super(props);
    this.objectName = "Voucher";
    this.breadcrumbs = [{ name: "Voucher" }];
    this.columns = [
      this.renderIdColumn(),
      { title: "Code", dataIndex: "voucherCode"},
      { title: "Serial", dataIndex: "voucherSerial"},
      { 
        title: "Money",
        dataIndex: "voucherMoney", 
        render: (voucherMoney) => (
            <div>
               { new Intl.NumberFormat('en-US').format(Number(voucherMoney)) }
            </div>
        )
      },
      { title: "Price", 
        dataIndex: "voucherPrice",
        render: (voucherPrice) => (
            <div>
               { new Intl.NumberFormat('en-US').format(Number(voucherPrice)) }
            </div>
        )
      },
      { 
        title: "Expired Date", 
        dataIndex: "voucherExpiredDate",
        render: (voucherExpiredDate) => (
          <div>
            {convertStringToDateTimeString(voucherExpiredDate, "DD/MM/YYYY HH:mm:ss", "DD/MM/YYYY")}
          </div>
        )
      },
      {
        title: "State", 
        dataIndex: "voucherCustomerId",
        render: (voucherCustomerId) => {
            return (
              <Tag className="tag-status" color={voucherCustomerId ? "green" : "yellow"}>
                  {voucherCustomerId ? "Used" : "Unused"}
              </Tag>
            )
          }
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
        key: "voucherCode",
        seachPlaceholder: "Code",
        initialValue: this.search.voucherCode,
      },
      {
        key: "voucherSerial",
        seachPlaceholder: "Serial",
        initialValue: this.search.voucherSerial,
      },
    ];
  }
  prepareUpdateData(data) {
      const voucherId = data.id;
    return {
        status: data.status,
        voucherExpiredDate: data.voucherExpiredDate,
        voucherId,
    };
 }
  render() {
    const {
      dataList,
      loading,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const voucher = dataList.data || [];
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
                <PlusOutlined /> New Voucher
              </Button>
            ))
          }
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={voucher}
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
          <VoucherForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? this.dataDetail : {}}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.voucher.voucherListLoading,
  dataList: state.voucher.voucherListData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getVoucherList(payload)),
  getDataById: (payload) => dispatch(actions.getVoucherById(payload)),
  createData: (payload) => dispatch(actions.createVoucher(payload)),
  updateData: (payload) => dispatch(actions.updateVoucher(payload)),
  deleteData: (payload) => dispatch(actions.deleteVoucher(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoucherListPage);
