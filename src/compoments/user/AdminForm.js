import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import { commonStatus, commonLanguages, config } from "../../constants/masterData";
import firebase from "firebase/app";

import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";

import {
  UserTypes,
  AppConstants,
  UploadFileTypes,
  STATUS_ACTIVE,
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";

import { actions } from "../../actions";

const { getUserData } = actions;

export const commonCol = [
  { value: 1, label: 'Do'},
  { value: 2, label: 'Doing'},
  { value: 3, label: 'Test'},
  { value: 4, label: 'Done'},
]

class AdminForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: props.dataDetail.logoPath
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.logoPath}`
        : "",
      uploading: false,
      index:0,
    };
    // this.otherData.logoPath = props.dataDetail.logoPath;
  }

  componentWillMount() {
    const { searchGroupPermissionList, getOrganizeList, kind } = this.props;
    searchGroupPermissionList({ params: { page: 0, size: 100, kind } });
    const userData = getUserData();
    if(userData.isSuperAdmin){
      getOrganizeList();
    }
  }

  componentDidMount() {
    const { dataDetail } = this.props;
    this.setFieldValue("logoPath", dataDetail.logoPath);
    this.setState({index: parseInt(Math.random() * (100000000000))});

  }

  componentWillReceiveProps(nextProps) {
    const { isEditing, roles } = this.props;
    if (
      !isEditing &&
      nextProps.roles !== roles &&
      nextProps.roles &&
      nextProps.roles.length > 0
    ) {
      this.setFieldValue("groupId", nextProps.roles[0].id);
    }
  }

  getOrganizeList(){
    const { organizeList } = this.props;
    const organizeListOptions = organizeList.data && organizeList.data.map(organize=>{
      return {
        value: organize.id,
        label: organize.organizeName,
      }
    })
    return organizeListOptions;
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
      };
    }
    return dataDetail;
  };

  async handleSubmit(formValues, runMutation) { 
    const { onSubmit, lenOfData, dataDetail, isEditing } = this.props;
    const {index} = this.state;
    onSubmit({
        ...formValues,
        ...this.otherData
    });
      const { key } = await runMutation({ 
        name: formValues.name,
        accountable: formValues.accountable,
        description: formValues.description,
        col: formValues.col,
        id: isEditing ? dataDetail.id : index,
      });
    console.log(key);
      

}

  render() {
    const { isEditing, formId, ddlRoleLoading, kind, lenOfData, dataDetail } = this.props;
    const {index} = this.state;
    return (
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        
      <FirebaseDatabaseMutation type="set" path={"task/data/data/" + `${isEditing ? dataDetail.id : index}`}>
      {({ runMutation }) => {
        return (

      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={(formValues)=>{this.handleSubmit(formValues, runMutation)}}
        initialValues={dataDetail}
      >
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="name"
              min={6}
              label="Task Name"
              required={!isEditing}
            />
          </Col>
          <Col span={12}>
            <TextField fieldName="accountable" label="Task Owner" required />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={16}>
            <TextField fieldName="description"
            label="Description" 
            type="textarea"
            style={{height: '120px'}}
            required
          />
          </Col>
          
          <Col span={16}>
            <DropdownField fieldName="col"
            label="Column" 
            required
            options={commonCol}

          />
          </Col>
        </Row>

      </Form>
             );
            }}
      </FirebaseDatabaseMutation>
      
      </FirebaseDatabaseProvider>
    );
  }
}

export default AdminForm;
