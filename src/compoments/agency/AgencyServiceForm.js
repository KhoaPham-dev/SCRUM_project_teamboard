import React from "react";
import { Button, Divider } from "antd";
import BaseTable from '../../compoments/common/table/BaseTable2';
import { showErrorMessage,showSucsessMessage } from "../../services/notifyService";
import ListBasePage from "../../containers/ListBasePage";
class AgencyServiceForm extends ListBasePage {
initialSearch() {
    return {};
}
  constructor(props) {
    super(props);
    this.objectName = 'agency';
    this.breadcrumbs = [{name: 'Agency'}];
    this.columns = [
        this.renderIdColumn(),           
        { title: 'Service', dataIndex: 'serviceName'},
        this.renderActionColumn(),
    ];

    this.actionColumns = {
        isEdit:true,
    }

    this.search = this.initialSearch();
}

componentWillReceiveProps(nextProps) {
    if(nextProps.serviceList !== this.props.serviceList) {
        this.setState({serviceList: nextProps.serviceList});
    }
}

componentWillMount() {
    // const { changeBreadcrumb } = this.props;
    // if(this.breadcrumbs.length > 0) {
    //     changeBreadcrumb(this.breadcrumbs);
    // }
    this.loadDataTable(this.props);
}
loadDataTable(currentProps) {

}

getList() {
    const { getDatalist, } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    const params = { page, size: this.pagination.pageSize, search: this.search};
    getDatalist({ params });
}

handleAddService(agencyId,serviceId) {
    document.getElementById(`btn${serviceId}`).setAttribute("disabled", true);
    const { addService, } = this.props;
    const params = { agencyId,serviceId };
    let id = serviceId;
    addService({
        params,
        onCompleted: ({data}) => {
            this.dataDetail = this.getDataDetailMapping(data);
            showSucsessMessage(`Add ${this.objectName} successful!`);
            let params = agencyId;
            this.props.getListServiceByAgency({params});
            this.handleCheckActivated(id);
            return;
        },
        onError: (err) => {
            if(err && err.message){
                if (document.getElementById(`btn${serviceId}`).getAttribute("disabled"))
                {document.getElementById(`btn${serviceId}`).removeAttribute("disabled")}
                showErrorMessage(err.message);
                
        }
            else{
                showErrorMessage(`${this.getActionName()} ${this.objectName} failed. Please try again!`);

            }
        }
    });
    
}

handleCheckActivated(id)
{
    const {listServiceByAgency} = this.props;
    if(listServiceByAgency &&  listServiceByAgency.data)
    {
        for (let j = 0; j < listServiceByAgency.data.length; j++)
            if (listServiceByAgency.data[j].serviceId ===id)
                return true;
    }
    return false;
}

renderActionColumn() {
    return {
        title: 'Action',
        width: '100px',
        render: (dataRow) => {
            let temp = this.handleCheckActivated(dataRow.id);
            const actionColumns = [];
            if(this.actionColumns.isEdit) {
                actionColumns.push(  
                    <Button 
                        id={`btn${dataRow.id}`}
                        type="primary"
                        size="medium"
                        style={{width: "50px"}}
                        disabled={temp}
                        loading={false}
                        onClick={()=> this.handleAddService(this.props.agencyId,dataRow.id)}
                        className="no-padding"    
                    >
                        Add
                    </Button>
                )
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

  render() {
    const {serviceList}= this.props;
    const serviceListdata= (serviceList && serviceList.data)? serviceList.data : [];
    const load = (serviceList && serviceList.data)?false:true;
    return (
        <BaseTable
            loading={load}
            columns={this.columns}
            rowKey={record => record.id}
            dataSource={serviceListdata}
            onChange={this.handleTableChange}

        />
    );
  }
}

 export default AgencyServiceForm;
