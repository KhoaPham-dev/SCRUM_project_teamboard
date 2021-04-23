import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import qs from 'query-string';

import ListBasePage from "../ListBasePage";
import ProvinceForm from "../../compoments/province/ProvinceForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { ProvinceKinds } from "../../constants";
import SearchForm from '../../compoments/common/entryForm/SearchForm';
import { FieldTypes } from "../../constants/formConfig";
import { commonStatus } from "../../constants/masterData";

class ProvinceListPage extends ListBasePage {
  initialSearch() {
    return { name: "", status: undefined};
  }

  constructor(props) {
    super(props);
    this.objectName = "province";
    this.breadcrumbs = [{ name: "Province" }];
    this.parentProvinces = [
      {
        id: undefined,
        name: undefined,
        searchName: '',
        searchStatus: undefined,
      },
      {
        id: undefined, 
        name: undefined,
        searchName: '',
        searchStatus: undefined,
      },
      {
        id: undefined ,
        name: undefined,
        searchName: '',
        searchStatus: undefined,
      }
    ]
    this.columns = [
      this.renderIdColumn(),
      { title: "Name",
        render: (dataRow) => {
          const { dataList } = this.props;
          return (
            <span style={this.findProvinceKindByKey('name', dataList.kind).level < 3 ? {color: "#40a9ff", cursor: 'pointer'} : null} onClick={e=>{
              let currentProvinceKind = this.findProvinceKindByKey('name', dataList.kind);
              if(currentProvinceKind && currentProvinceKind.level < Object.keys(ProvinceKinds).length){
                
                //Update query string

                this.parentProvinces[currentProvinceKind.level - 1].id = dataRow.id;
                this.parentProvinces[currentProvinceKind.level - 1].name = dataRow.provinceName;
                this.parentProvinces[currentProvinceKind.level - 1].searchName = this.search.name;
                this.parentProvinces[currentProvinceKind.level - 1].searchStatus = this.search.status;

                //Clear current search form
                this.search = this.initialSearch();
                this.pagination.current = 1;
                this.setQueryString();
              }
            }}>
              {dataRow.provinceName}
            </span>
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

  findProvinceKindByKey = (key, value) => {
    return ProvinceKinds[Object.keys(ProvinceKinds).find(e=>ProvinceKinds[e][key]===value)];
  }

  getSearchFields() {
    return [
      {
        key: "name",
        seachPlaceholder: "Name",
        initialValue: this.search.name,
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

  loadDataTable(currentProps) {
    const queryString = qs.parse(currentProps.location.search);
    this.pagination.current = 1;
    if(!isNaN(queryString.page))
        this.pagination.current = parseInt(queryString.page);
    Object.keys(this.search).forEach(key => this.search[key] = queryString[key]);
    this.parentProvinces.forEach((prov, i) => Object.keys(this.parentProvinces[i]).forEach(key=>{
      if(i === 0){
        this.parentProvinces[i][key] = queryString['province' + key];
      }  
      else if(i === 1){
          this.parentProvinces[i][key] = queryString['district' + key];
      }
      else if(i === 2){
        this.parentProvinces[i][key] = queryString['ward' + key];
      }
    }));
    this.getList();
  }

  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    let kind = ProvinceKinds.province.name;
    let parentId = null;
    if(this.parentProvinces[1].id){
      kind = ProvinceKinds.ward.name;
      parentId = this.parentProvinces[1].id;
    }
    else if(this.parentProvinces[0].id || this.parentProvinces[0].id === 0){
      kind = ProvinceKinds.district.name;
      parentId = this.parentProvinces[0].id;
    }
    const params = { page, 
                    size: this.pagination.pageSize, 
                    search: this.search,
                    parentId,
                    kind
                  };
    getDataList({ params });
  }

  prepareUpdateData(data) {
    if(data.parentId === -1){
      data.parentId = 0;
    }
    return {
        ...data,
        provinceId: this.dataDetail.id
    };
  }

  setQueryString() {
    const { location: { pathname, search }, history } = this.props;
    const queryString = qs.parse(search);
    let newQsValue = {};
    if(this.pagination.current > 1) {
        newQsValue.page = this.pagination.current;
    }
    else  {
        delete queryString.page;
    }
    const refactorParentProvinces = {};
    this.parentProvinces.forEach((e, i)=>{
      if(i === 0){
        Object.keys(e).forEach(t=>{
          refactorParentProvinces['province' + t] = e[t];
        })
      }
      else if(i === 1){
        Object.keys(e).forEach(t=>{
          refactorParentProvinces['district' + t] = e[t];
        })
      }
      else if(i === 2){
        Object.keys(e).forEach(t=>{
          refactorParentProvinces['ward' + t] = e[t];
        })
      }
    });
    newQsValue = Object.assign(queryString, newQsValue, this.search, refactorParentProvinces);
    
    if(Object.keys(newQsValue).length > 0)
    {
        Object.keys(newQsValue).forEach(key => {
            if(!newQsValue[key] && newQsValue[key] !== 0)
                delete newQsValue[key];
         });
        
    }

    if(Object.keys(newQsValue).length > 0)
        history.push(`${pathname}?${qs.stringify(newQsValue)}`);            
    else
        history.push(pathname);
  }
  renderSearchForm(hiddenAction) {
    const searchFields = this.getSearchFields();

    if(searchFields.length > 0)
        return <SearchForm
            key={this.props.dataList.parentId || -1}
            searchFields={searchFields}
            onSubmit={this.onSearch}
            onResetForm={this.onResetFormSearch}
            hiddenAction={hiddenAction}
            initialValues={this.search}
            />;
    return null;
}

  render() {
    const {
      dataList,
      loading,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const province = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;
    this.objectName = this.findProvinceKindByKey('name', dataList.kind) && this.findProvinceKindByKey('name', dataList.kind).text;
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar province">
          <div>
            {this.findProvinceKindByKey('name', dataList.kind)?.name === ProvinceKinds.province.name ? 
              <span></span> : 
              this.parentProvinces.map((a, i)=>{
                if(a.name){
                  return (
                    <span key={a.id} style={{color: "#40a9ff", cursor: 'pointer'}} onClick={e=>{
                      const { dataList } = this.props;
                      let currentProvinceKind = this.findProvinceKindByKey('name', dataList.kind);
                      let previousLevelKind = i + 1;
                      for (let index = previousLevelKind; index <= currentProvinceKind.level; index++) {
                        let beforeProvinceKind = this.findProvinceKindByKey('level', index);
                        if(beforeProvinceKind){
                          //Update query string
                          this.parentProvinces[beforeProvinceKind.level - 1].id = undefined;
                          this.parentProvinces[beforeProvinceKind.level - 1].name = undefined;
                          //Handle previous search form
                          if(index > previousLevelKind){
                            this.parentProvinces[beforeProvinceKind.level - 1].searchName = undefined;
                            this.parentProvinces[beforeProvinceKind.level - 1].searchStatus = undefined;
                          }
                          else{ //index === previousLevelKind
                            this.search = {
                              name: this.parentProvinces[beforeProvinceKind.level - 1].searchName,
                              status: this.parentProvinces[beforeProvinceKind.level - 1].searchStatus
                            };
                          }
                        }
                      } 
                      this.pagination.current = 1;
                      this.setQueryString();
                    }}>
                      {a.name} {<span style={{margin: "0 5px", color: "#ccc"}}>></span>}
                    </span>
                  )
                }
                else return null;
              })
            }
          </div>
          {
            this.renderCreateNewButton((
            <Button
                        type="primary"
                        onClick={() => this.onShowModifiedModal(false)}
                      >
              <PlusOutlined /> New {this.findProvinceKindByKey('name', dataList.kind) && this.findProvinceKindByKey('name', dataList.kind).text}
            </Button>
            ))
          }
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={province}
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
          <ProvinceForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? {...this.dataDetail, parentId: dataList.parentId} : { kind: dataList.kind, parentId: dataList.parentId}}
            parentProvinces={this.parentProvinces}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.province.tbProvinceLoading,
  dataList: state.province.provinceData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getProvinceList(payload)),
  getDataById: (payload) => dispatch(actions.getProvinceById(payload)),
  createData: (payload) => dispatch(actions.createProvince(payload)),
  updateData: (payload) => dispatch(actions.updateProvince(payload)),
  deleteData: (payload) => dispatch(actions.deleteProvince(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProvinceListPage);
