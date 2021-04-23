import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { PlusOutlined,} from '@ant-design/icons';

import ListBasePage from '../ListBasePage';
import CategoryForm from '../../compoments/category/CategoryForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import KindTag from '../../compoments/common/elements/KindTag';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import CategoryListPage from '../../containers/category/CategoryListPage';
import qs from 'query-string';

class CategoryListPageChild extends ListBasePage {
    initialSearch() {
        let searchchildname = this.props.location && this.props.location.search? this.sliceparentLocationSearch(this.props.location.search).name : {}
        if (searchchildname)
            return {name: "", childname: searchchildname }
        return { name: "",};
    }

    constructor(props) {
        super(props);
        this.objectName = 'category';

        this.breadcrumbs = [{name: 'Category'}];
        this.columns = [
            this.renderIdColumn(),
            {title: 'Name', dataIndex: 'categoryName'},
            { title: 'Description', dataIndex: 'description'},
            this.renderKindColumn(),
            { title: 'Ordering', dataIndex: 'ordering'},
            this.renderActionColumn()
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
        }
    }

    getList() {
        const { getDataList } = this.props;
        const temp = parseInt(decodeURI(this.props.location.pathname.split("&parentId=")[1]));
        const page = this.pagination.current ? this.pagination.current - 1 : 0;
        const params = {parentId: temp, page, size: this.pagination.pageSize, search: this.search};
        getDataList({ params });
    }
    getSearchFields() {
        let searchparentname = this.props.location && this.props.location.search? this.sliceLocationSearch(this.props.location.search).name : this.search.name
        this.search.name = searchparentname;
        return [
            { key: "name", seachPlaceholder: 'Category Name', 
                initialValue: this.search.parentname? this.search.parentname : this.search.name
            },
        ];
    }

    prepareCreateData(values) {
        return {
            ...values,
            parentId:parseInt(decodeURI(this.props.location.pathname.split("&parentId=")[1])),
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
    renderRouting (){
        const childsearch=this.renderSearchBeforeRouting();     
        this.props.history.push("/category"+`?${qs.stringify(childsearch)}`);
        return () =>
        <Router>
            <Route path="category/" component={CategoryListPage}/>
        </Router>
    }
    renderSearchBeforeRouting()
    {
        const currentsearch=this.setQueryString();
        Object.keys(currentsearch)
        .forEach(key => {
            if(!([key].toString().includes("child")||[key].toString().includes("parent")))
                delete currentsearch[key];
        });
        return currentsearch;
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
            Object.keys(refactorParentProvinces).forEach(key=> !key.includes("parent") ? refactorParentProvinces["child"+key]=refactorParentProvinces[key]:refactorParentProvinces[key]=refactorParentProvinces[key]);
            newQsValue=Object.assign(newQsValue,refactorParentProvinces);
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
    sliceLocationSearch(locationsearch)
    {
        var searchParams = new URLSearchParams(locationsearch);
        let temp = {name: {}, kind: {}}
        temp.name = searchParams.get("childname");
        temp.kind = searchParams.get("childkind");
        return temp;
    }
    sliceparentLocationSearch(locationsearch)
    {
        var searchParams = new URLSearchParams(locationsearch);
        let temp = {name: {}, kind: {}}
        temp.name = searchParams.get("parentname");
        temp.kind = searchParams.get("parentkind");
        return temp;
    }
    loadDataTable(currentProps) {
        const queryString = qs.parse(currentProps.location.search);
        if (queryString.childname)
            queryString.name = queryString.childname;
        this.pagination.current = 1;
        if(!isNaN(queryString.page))
            this.pagination.current = parseInt(queryString.page);
        Object.keys(this.search).forEach(key => this.search[key] = queryString[key]);
        this.getList();
        this.props.history.replace(`${this.props.location.pathname}?${qs.stringify(queryString)}`);          
    }
    render() {
        const { dataList, loading } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        this.pagination.total = dataList.totalElements || 0;
        let category = dataList.data;
        return (
            <div>
                {this.renderSearchForm()}
                <div className="action-bar category">   
                    <span style={{color: "#40a9ff"}}>

                    {<a style={{margin: "0 5px",}} onClick={()=>this.renderRouting()}>Tất cả</a>}
                    {<span style={{margin: "0 5px", color: 'black'}}>></span>}
                    {decodeURI(this.props.location.pathname.split("&parentId=")[0].split("parentName=")[1])}
                    </span> 
                    

                    <Button type="primary" onClick={() => this.onShowModifiedModal(false)}>
                    <PlusOutlined /> Add Category
                    </Button>
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
                            dataDetail={this.isEditing ? {...this.dataDetail} : {}}
                            parentId={parseInt(decodeURI(this.props.location.pathname.split("&parentId=")[1]))}             
                        />
                </BasicModal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.category.categoryListLoading,
    dataList: state.category.categoryListData || {},
})

const mapDispatchToProps = dispatch => ({
    getDataList: (payload) => dispatch(actions.getCategoryList(payload)),
    getDataById: (payload) => dispatch(actions.getCategory(payload)),
    createData: (payload) => dispatch(actions.createCategory(payload)),
    updateData: (payload) => dispatch(actions.updateCategory(payload)),
    deleteData: (payload) => dispatch(actions.deleteCategory(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListPageChild);