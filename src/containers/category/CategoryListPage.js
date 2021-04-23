import React from 'react';
import { connect } from 'react-redux';
import { Button, } from 'antd';
import { PlusOutlined,} from '@ant-design/icons';

import ListBasePage from '../ListBasePage';
import CategoryForm from '../../compoments/category/CategoryForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { commonKinds, } from '../../constants/masterData';
import KindTag from '../../compoments/common/elements/KindTag';
import CategoryListPageChild from '../../containers/category/CategoryListPageChild';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import qs from 'query-string';
class CategoryListPage extends ListBasePage {
    initialSearch() {
        let searchchildname = this.props.location && this.props.location.search? this.slicechildLocationSearch(this.props.location.search).name : {}
        if (searchchildname)
            return {name: "", kind: undefined, childname:searchchildname  }
        return { name: "", kind:undefined,};
    }

    constructor(props) {
        super(props);
        this.objectName = 'category';
        this.breadcrumbs = [{name: 'Category'}];
        this.columns = [
            this.renderIdColumn(),
            {
                title: 'Name', 
                render: (dataRow) => {
                    return (
                        <span style={{cursor: 'pointer', color: "#1890ff"}} onClick={()=>{
                            this.renderRouting(dataRow.id,dataRow.categoryName);
                        }}>
                            {dataRow.categoryName}
                        </span>
                    )
                }
            },
            { title: 'Description', dataIndex: 'description'},
            this.renderKindColumn(),
            { title: 'Ordering', dataIndex: 'ordering'},
            this.renderActionColumn()
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
            isChangeStatus: false
        }
    }

    getSearchFields() {
        let searchparentname = this.props.location && this.props.location.search? this.sliceLocationSearch(this.props.location.search).name : this.search.name
        this.search.name = searchparentname;
        let searchparentkind = this.props.location && this.props.location.search? this.sliceLocationSearch(this.props.location.search).kind : this.search.kind
        this.search.kind = searchparentkind;

        return [
            { 
                key: "name", 
                seachPlaceholder: 'Category Name', 
                initialValue: searchparentname,
            },
            {
                key: "kind",
                seachPlaceholder: "Select Kind",
                fieldType: FieldTypes.SELECT,
                options: commonKinds,
                initialValue: searchparentkind,
            },
        ];
    }

    prepareCreateData(values) {
        return {
            ...values,
        };
    }
    
    prepareUpdateData(data) {
        return {
            ...data,
            categoryId: this.dataDetail.id,
        };
    }


    getDataDetailMapping(data) {
        return {
            ...data,
            parentId: this.dataDetail.id,
        }
    }

    renderKindColumn() {
        return {
            title: 'Kind',
            dataIndex: 'kind',
            width: '100px',
            render: (kind) => <KindTag kind={kind}/>
        }
    }
    renderRouting (id,name){
        const parentsearch=this.renderSearchBeforeRouting();     
        this.props.history.push("category/"+`parentName=${name}&parentId=${id}?${qs.stringify(parentsearch)}`);
        return () =>
        <Router>
            <Route path="category/" component={CategoryListPageChild}/>
        </Router>
    }

    renderSearchBeforeRouting()
    {
        const currentsearch=this.setQueryString();
        Object.keys(currentsearch)
        .forEach(key => {
            if(!([key].toString().includes("parent") || [key].toString().includes("child")))
                delete currentsearch[key];
        });
        return currentsearch;
    }

    sliceLocationSearch(locationsearch)
    {
        var searchParams = new URLSearchParams(locationsearch);
        let temp = {name: {}, kind: {}}
        temp.name = searchParams.get("parentname");
        temp.kind = searchParams.get("parentkind");
        return temp;
    }
    slicechildLocationSearch(locationsearch)
    {
        var searchParams = new URLSearchParams(locationsearch);
        let temp = {name: {}}
        temp.name = searchParams.get("childname");
        return temp;
    }
    onSearch(values) {
        this.search=Object.assign(this.search, values);
        this.pagination.current = 1;
        this.setQueryString();
    }
    loadDataTable(currentProps) {
        const queryString = qs.parse(currentProps.location.search);
        if (queryString.parentname)
            queryString.name = queryString.parentname;
        if (queryString.parentkind)
            queryString.kind = queryString.parentkind;
        this.pagination.current = 1;
        if(!isNaN(queryString.page))
            this.pagination.current = parseInt(queryString.page);
        Object.keys(this.search).forEach(key => this.search[key] = queryString[key]);
        this.getList();
        this.props.history.replace(`${this.props.location.pathname}?${qs.stringify(queryString)}`);          
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
        newQsValue = Object.assign(queryString, newQsValue, this.search);
        const refactorParentProvinces = {};
            Object.keys(this.search).forEach(key => refactorParentProvinces[key]=this.search[key]);
            Object.keys(refactorParentProvinces).forEach(key=> !key.includes("child") ? refactorParentProvinces["parent"+key]=refactorParentProvinces[key]:refactorParentProvinces[key]=refactorParentProvinces[key]);
            newQsValue=refactorParentProvinces;
        if(Object.keys(newQsValue).length > 0)
        {
            Object.keys(newQsValue).forEach(key => {
                if(!newQsValue[key])
                    delete newQsValue[key];
             });
        }
        if(Object.keys(newQsValue).length > 0)
            history.push(`${pathname}?${qs.stringify(newQsValue)}`);            
        else
            history.push(pathname);
        return(newQsValue);
    }
    render() {
        const { dataList, loading, } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        this.pagination.total = dataList.totalElements || 0;
        
        let category = [];
        let j = 0;
        for (let i = 0; i <dataList.totalElements;i++)
            if (dataList.data[i] && !dataList.data[i].parentId)
                category[j++] = dataList.data[i];

        return (
            <div>
                {this.renderSearchForm()}
                <div className="action-bar">    
                    {this.renderCreateNewButton((
                        <Button
                        type="primary"
                        onClick={() => this.onShowModifiedModal(false)}
                    >
                        <PlusOutlined /> New Category
                    </Button>
                    ))}
                </div>
                <BaseTable
                    loading={loading}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={category}
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
                        <CategoryForm
                            isEditing={this.isEditing}
                            dataDetail={this.isEditing ?{...this.dataDetail} : {}}
                        />
                </BasicModal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.category.categoryListLoading,
    dataList: state.category.categoryListData || {},
    parent: state.category.parent,
})

const mapDispatchToProps = dispatch => ({
    getDataList: (payload) => dispatch(actions.getCategoryList(payload)),
    getDataById: (payload) => dispatch(actions.getCategory(payload)),
    createData: (payload) => dispatch(actions.createCategory(payload)),
    updateData: (payload) => dispatch(actions.updateCategory(payload)),
    deleteData: (payload) => dispatch(actions.deleteCategory(payload)),

})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListPage);