import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import { commonStatus, } from "../../constants/masterData";

import {
  AppConstants,
  UploadFileTypes,
  STATUS_ACTIVE,
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";

class OrganizeForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: props.dataDetail.logoPath
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.logoPath}`
        : "",
      uploading: false,
    };
  }
  
  componentDidMount() {
    const { dataDetail } = this.props;
    this.setFieldValue("organizeLogo", dataDetail.logoPath);
  }

  // componentWillReceiveProps(nextProps) {
  //   const { isEditing, roles } = this.props;
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { isEditing } = this.props;
  // }

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
        this.setFieldValue("organizeLogo", result.data.filePath);
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

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
      };
    }
    return dataDetail;
  };

  render() {
    const { isEditing, formId } = this.props;
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
            fieldName="organizeLogo"
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
              fieldName="organizeName"
              min={6}
              label="Name"
              disabled={isEditing}
              required={!isEditing}
            />
          </Col>
          <Col span={12}>
            <TextField fieldName="organizeAddress" 
            label="Address" required 
          />
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <TextField fieldName="organizeDescription" 
            label="Description" 
            type="textarea"
            // style="height: 100px"
            style={{height: '120px'}}
            required
          />
          </Col>
          <Col span={12}>
            <TextField 
              fieldName="organizePhone"
              label="Phone" type="number"
              required={!isEditing}
              minLength={10}
              maxLength={11}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="status"
              label="Status"
              required
              options={commonStatus}
            />
          </Col>

        </Row>
      </Form>
    );
  }
}

export default OrganizeForm;
