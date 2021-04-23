import React from "react";
import { connect } from "react-redux";
import { Button, Avatar } from "antd";
import { PlusOutlined, FileTextOutlined } from "@ant-design/icons";

import ListBasePage from "../ListBasePage";
import NewsForm from "../../compoments/news/NewsForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";
import { FieldTypes } from "../../constants/formConfig";
import { commonStatus } from "../../constants/masterData";

import { actions } from "../../actions";
import {
  AppConstants,
} from "../../constants";

class NewsListPage extends ListBasePage {
  initialSearch() {
    return { newTitle: "", status: undefined, categoryId: undefined};
  }

  constructor(props) {
    super(props);
    this.objectName = "News";
    this.breadcrumbs = [{ name: "News" }];
    this.columns = [
      this.renderIdColumn(),
      {
        title: "Avatar",
        dataIndex: "newAvatar",
        render: (avatar) => (
          <Avatar
            style={{width: "100px", height: "100px", borderRadius: "0", padding: "8px"}}
            size="large"
            icon={<FileTextOutlined />}
            src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
          />
        ),
      },
      { title: "Title", dataIndex: "newTitle", width: '20%' },
      { title: "Created By", dataIndex: "createdBy" },
      { title: "Created Date", dataIndex: "createdDate" },
      { title: "Ordering", dataIndex: "newOrdering" },
      {
        title: "Category",
        dataIndex: "categoryId",
        render: (categoryId) => {
          let category;
          if(this.categoryOptions.length > 0){
            category =  this.categoryOptions.find(e=>e.value===categoryId);
          }
          return (
          <span>
            {category ? category.label : ''}
          </span>
        )},
      },
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
    this.props.getComboboxNewsList();
    this.categoryOptions = [];
  }

  getSearchFields() {
    const {comboboxNewsListLoading} = this.props;
    return [
      {
        key: "newTitle",
        seachPlaceholder: "Select Title",
        initialValue: this.search.newTitle,
      },
      {
        key: "status",
        seachPlaceholder: "Select Status",
        fieldType: FieldTypes.SELECT,
        options: commonStatus,
        initialValue: this.search.status,
      },
      {
        key: "categoryId",
        seachPlaceholder: "Select Category",
        fieldType: FieldTypes.SELECT,
        options: [...this.categoryOptions],
        initialValue: this.search.categoryId,
        loading: comboboxNewsListLoading
      },
    ];
  }

  prepareCreateData(data) {
    return {
      ...data,
      newKind: this.props.comboboxNewsListData.data[0].kind,
    }
  }

    prepareUpdateData(data) {
      return {
        ...data,
        newKind: this.props.comboboxNewsListData.data[0].kind,
        id: this.dataDetail.id
      }
    }


  render() {
    const {
      dataList,
      loading,
      comboboxNewsListData,
      uploadFile,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const news = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    this.categoryOptions = comboboxNewsListData.data ? comboboxNewsListData.data.map(c=>{
      return {
        value: c.categoryId,
        label: c.categoryName,
      }
    }) : [];
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
                <PlusOutlined /> New News
              </Button>
            ))
          }
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={news}
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
          <NewsForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? this.dataDetail : {}}
            categoryOptions={this.categoryOptions}
            uploadFile={uploadFile}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.news.newsListLoading,
  dataList: state.news.newsListData || {},
  comboboxNewsListLoading: state.news.comboboxNewsListLoading,
  comboboxNewsListData: state.news.comboboxNewsListData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getNewsList(payload)),
  getDataById: (payload) => dispatch(actions.getNewsById(payload)),
  createData: (payload) => dispatch(actions.createNews(payload)),
  updateData: (payload) => dispatch(actions.updateNews(payload)),
  deleteData: (payload) => dispatch(actions.deleteNews(payload)),
  getComboboxNewsList: (payload) => dispatch(actions.getComboboxNewsList(payload)),
  uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsListPage);
