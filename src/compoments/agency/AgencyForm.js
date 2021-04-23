import React from "react";
import { Form, Col, Row, } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import { commonStatus, commonLanguages} from "../../constants/masterData";
import Utils from "../../utils";
import {
  STATUS_ACTIVE,
  AppConstants,
  UploadFileTypes,
} from "../../constants";
import { showErrorMessage } from "../../services/notifyService";
import FieldSet from "../common/elements/FieldSet"
import DatePickerField from "../common/entryForm/DatePickerField";

class AgencyForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: props.dataDetail.avatarPath
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.avatarPath }`
        : "",
      uploading: false,
      districtlist:[],
      districtloading:props.dataDetail.districtId? true :false,
      wardlist:[],
      wardloading:props.dataDetail.communeId? true :false,

      provinceisslect:props.dataDetail.provinceId? props.dataDetail.provinceId :{},
      districtisslect:props.dataDetail.districtId? props.dataDetail.districtId :{},
    };
    this.props.getProvinceComboboxList();
    
    if (this.props.dataDetail.provinceDto && this.props.dataDetail.provinceDto.provinceId && this.props.dataDetail.districtDto && this.props.dataDetail.districtDto.provinceId)  
    {
      let value=this.props.dataDetail.provinceDto.provinceId;
      this.props.getDistrictComboboxList ({
        params: {value},
      })
    }
    if ( this.props.dataDetail.districtDto && this.props.dataDetail.districtDto.provinceId && this.props.dataDetail.communeDto && this.props.dataDetail.communeDto.provinceId)  
    {
      let value=this.props.dataDetail.districtDto.provinceId;
      this.props.getWardComboboxList ({
        params: {value},
      })
    }
  }

  handleChangeLogo = (info) => {
    console.log(info);
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (logo) =>
        this.setState({ logo })
      );
    }
  };

  handleProvinceChange = (value) =>{
    const { getDistrictComboboxList, districtComboboxList,  } = this.props;
    const { wardloading, provinceisslect} = this.state;
    if(value === provinceisslect ) return;

    getDistrictComboboxList ({
      params: {value},
    })
    this.setState({districtloading:true});
    this.setState({districtlist:districtComboboxList});
    this.setState({provinceisslect: value})
    if (wardloading) 
    {this.setState({wardloading:false});
    this.setFieldValue("districtId", "");
    this.setFieldValue("communeId", "");}
  }

  handleDistrictChange = (value) =>{
    const { getWardComboboxList, wardComboboxList } = this.props;
    const { districtisslect} = this.state;
    if(value === districtisslect ) return;
    getWardComboboxList ({
      params: {value},
    })
    this.setState({wardloading:true});
    this.setState({wardlist:wardComboboxList});
    this.setState({districtisslect: value})
    this.setFieldValue("communeId", "");

  }

  componentWillReceiveProps(nextProps)
  {
    if(nextProps.districtComboboxList !== this.props.districtComboboxList)
      {
        this.setState({districtlist: nextProps.districtComboboxList});
      }
      if(nextProps.districtloading !== this.props.districtloading)
      {
        this.setState({districtloading: nextProps.districtloading});
      }

    if(nextProps.wardComboboxList !== this.props.wardComboboxList)
      {
        this.setState({wardlist: nextProps.wardComboboxList});
      }
      if(nextProps.wardloading !== this.props.wardloading)
      {
        this.setState({wardloading: nextProps.wardloading});
      }

      if(nextProps.provinceisslect !== this.props.provinceisslect)
      {
        this.setState({provinceisslect: nextProps.provinceisslect});
      }
      if(nextProps.districtisslect !== this.props.districtisslect)
      {
        this.setState({districtisslect: nextProps.districtisslect});
      }
  }

  uploadFileLogo = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.LOGO },
      onCompleted: (result) => {
        this.setFieldValue("avatarPath", result.data.filePath);
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
    this.setFieldValue("avatarPath", dataDetail.avatarPath);
  }
  componenta() {
    const provinceCombobox=this.props.provinceComboboxList.data ? this.props.provinceComboboxList.data.map(c=>{
      return {
          value: c.provinceId,
          label: c.provinceName,
      }
    }):[];
    return provinceCombobox;
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail,} = this.props; 
    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
      };
    }
    return dataDetail;
  };
  validateToConfirmPassword = (rule, value) => {
    const {
      current: { validateFields, isFieldTouched },
    } = this.formRef;
    if (isFieldTouched("confirmPassword")) {
      validateFields(["confirmPassword"], { force: true });
    }
    return Promise.resolve();
  };

  compareToPassword = (newPassword) => {
    const password = this.getFieldValue("password");
    if ((password || newPassword) && password !== newPassword) {
      return Promise.reject("Password that you enter is inconsistent!");
    } else {
      return Promise.resolve();
    }
  };

  onChangeDate = (value) => {
    const Date = this.getFieldValue('birthday');
    if(Date) {
        this.setFieldValue('birthday', value);
    }
  }
  onChangeDate2 = (value) => {
    const Date = this.getFieldValue('dateOfIssue');
    if(Date) {
        this.setFieldValue('dateOfIssue', value);
    }
  }

  render() {
    const { isEditing, formId,  provinceloading,} = this.props;
    const { logo, uploading, districtlist, wardlist, districtloading, wardloading, } = this.state;

    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialFormValues()}
        loading={provinceloading}
      >
        <FieldSet
          title="Agency Information"
        >
        <Row gutter={16}>
        <Col span={12}>
          <CropImageFiled
            fieldName="avatarPath"
            loading={uploading}
            label="Avatar"
            imageUrl={logo}
            onChange={this.handleChangeLogo}
            uploadFile={this.uploadFileLogo}
            required
            requiredMsg="Please enter logo"
          />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="fullName"
              label="Full Name"
              required
            />
          </Col>
          <Col span={12}>
            <DatePickerField
              fieldName="birthday"
              label="Birthday"
              width="60%"
              required={!isEditing}
              onChange={this.onChangeDate}
              format={"DD/MM/YYYY"}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="phone"
              label="Phone Number"
              type="number"
              minLength={10}
              maxLength={11}
              required
            />
          </Col>
          <Col span={12}>
            <TextField
              fieldName="email" 
              label="E-mail"
              type="email" 
              required
            />
          </Col>
          
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="lang"
              label="Language"
              required
              options={commonLanguages}
            />
          </Col>
          <Col span={12}>
          <TextField
              fieldName="username"
              min={6}
              label="Username"
              required={!isEditing}
              disabled = {isEditing?true:false}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              type="password"
              fieldName="password"
              label={isEditing ? "New Password" : "Password"}
              required={!isEditing}
              validators={[this.validateToConfirmPassword]}
              minLength={6}
            />
          </Col>
          <Col span={12}>
            <TextField
              type="password"
              label={isEditing ? "Confirm New Password" : "Confirm Password"}
              required={!isEditing || this.getFieldValue("password")}
              validators={[this.compareToPassword]}
            />
          </Col>
        </Row>
        </FieldSet>

        <FieldSet
          title="Identifier"
        >
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="identityNumber"
              label="Identity Number"
              type="number"
              minLength={12}
              maxLength={12}
              required
            />
          </Col>
          </Row>
          <Row gutter={16}>
        <Col span={12}>
          <TextField
              fieldName="placeOfIssue"
              label="Place Of Issue"
              required
            />
            </Col>
          <Col span={12}>
            <DatePickerField
              fieldName="dateOfIssue"
              label="Date Of Issue"
              width="60%"
              required={!isEditing}
              format={"DD/MM/YYYY"}
              onChange={this.onChangeDate2}
            />
          </Col>
        </Row>
        </FieldSet>
        <FieldSet
          title="Address"
        >
        <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="provinceId"
              label="Province"
              required
              options={this.componenta()}
              onSelect={this.handleProvinceChange}
            />
          </Col>
          <Col span={12}>
            <DropdownField
              fieldName="districtId"
              label="District"
              required
              disabled={!districtloading}
              options = {(districtloading && districtlist && districtlist.data)?districtlist.data.map(c=>{
                return {
                    value: c.provinceId,
                    label: c.provinceName,
                }
              }):[]}
              onSelect={this.handleDistrictChange}
            />
          </Col>
          </Row>

          <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="communeId"
              label="Ward"
              required
              disabled={!wardloading}
              options = {(wardloading && wardlist && wardlist.data)?wardlist.data.map(c=>{
                return {
                    value: c.provinceId,
                    label: c.provinceName,
                }
              }):[]}
              
            />
          </Col>
          <Col span={12}>
          <TextField
              fieldName="address"
              label="Address"
              required
            />
            </Col>
        </Row>
        </FieldSet>
        <FieldSet title="Bank">
          
        <Row gutter={16}>          
          <Col span={12}>
            <TextField
              fieldName="bankName"
              label="Bank Name"
              required
            />
          </Col>
          <Col span={12} >
            <TextField
              fieldName="bankNo"
              label="Bank Number"
              type="number"
              minLength={8}
              maxLength={15}
              required
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="branchName"
              label="Branch Name"
              required
            />
          </Col>
        </Row>
        </FieldSet>
      <FieldSet title="State"> 
        <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="status"
              label="Status"
              required
              options={commonStatus}
            />
            </Col>
            <Col span={12}>
            <TextField 
              fieldName="note"
              label="Note" 
              type="textarea"
              style={{height: '120px'}}
              required
            />
          </Col>
        </Row>
        
          
          </FieldSet>
      </Form>
      
    );
    
  }
}

export default AgencyForm;
