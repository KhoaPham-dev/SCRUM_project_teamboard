import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import NumericField from "../common/entryForm/NumericField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import { commonStatus,} from "../../constants/masterData";
import Utils from "../../utils";
import {
  STATUS_ACTIVE,
  AppConstants,
  UploadFileTypes,
} from "../../constants";
import { showErrorMessage } from "../../services/notifyService";
class CategoryForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: props.dataDetail.serviceImageUrl
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.serviceImageUrl}`
        : "",
      uploading: false,
    };
  }

  handleChangeLogo = (info) => {
    console.log(info);
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (logo) =>
        this.setState({ logo })
      );
    }
  };

  uploadFileLogo = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.LOGO },
      onCompleted: (result) => {
        // this.otherData.logoPath = result.data.filePath;
        this.setFieldValue("serviceImageUrl", result.data.filePath);
        this.setState({ uploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploading: false });
        }
      },
    });
  };
  
  componentDidMount() {
    const { dataDetail } = this.props;
    this.setFieldValue("parentId", dataDetail.parentId);
    this.setFieldValue("serviceImageUrl", dataDetail.serviceImageUrl);
  }

  componentWillMount() {
    this.props.getComboboxList();
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

  getCategoryList=() =>
  {
      const {comboboxList} = this.props;
      let categorylist=[];
      if (comboboxList && comboboxList.data)
          for (let i = 0; i <comboboxList.data.length;i++)
          {
              categorylist.push({value: comboboxList.data[i].categoryId, label: comboboxList.data[i].categoryName})
          }
      return categorylist;
  }

  ValidateRatioLimit = (ratio) => {
    const Ratio = this.getFieldValue("serviceRatioShare");
    if ((ratio || Ratio) && (ratio < 0 || Ratio  < 0 ||ratio >100 || Ratio  >100))
      return Promise.reject("Ratio Share must be between 0 and 100");
    return Promise.resolve();
  };

  render() {
    const { isEditing, formId, } = this.props;
    const { logo, uploading } = this.state;
    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialFormValues()}
      >
        <Row gutter={16}>
          <CropImageFiled
            fieldName="serviceImageUrl"
            loading={uploading}
            label="Logo"
            imageUrl={logo}
            onChange={this.handleChangeLogo}
            uploadFile={this.uploadFileLogo}
            required
            requiredMsg="Please enter logo"
          />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="serviceName"
              min={6}
              label="Name"
              required={!isEditing}
            />
          </Col>
          <Col span={12}>
            <DropdownField
              fieldName="categoryId"
              label="Category Name"
              required
              options={this.getCategoryList()}
              disabled={this.props.dataDetail.categoryName? true : false}
            />
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <TextField fieldName="serviceDescription"
            label="Description" 
            type="textarea"
            style={{height: '120px'}}
            required
          />
          </Col>

          <Col span={12}>
            <TextField fieldName="serviceShortDescription"
            label="Short Description" 
            type="textarea"
            style={{height: '120px'}}
            required
          />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <NumericField
              
              // value={0}
              fieldName="servicePrice"
              label="Price"
              min={0}
              style={{witdh: '100%'}}
              required
              formatter={value => Utils.formatMoney(value,{currentcy: "$"})}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Col>
          <Col span={12} >
            <NumericField
              fieldName="serviceRatioShare"
              label="Ratio Share(%)"
              min={0}
              max={100}
              type="number"
              required
              formatter={value => Utils.formatMoney(value, {currentcy: "%"})}
            />
          </Col>
          
        </Row>

        <Row gutter={16}>          
          <Col span={12}>
            <TextField
              fieldName="serviceVideoUrl"
              label="Video URL"
              required
            />
          </Col>
          <Col span={12} >
            <DropdownField
              fieldName="status"
              label="Status"
              required
              options={commonStatus}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12} hidden>
            <TextField
              fieldName="parentId"
              label="Parent ID"
              disabled
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CategoryForm;
